import type { Ref } from "vue";
import { ragClient } from "~/lib/api/rag-client";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  parts: Array<{
    type: "text";
    text: string;
  }>;
}

export interface UseAIChatOptions {
  initialMessages?: ChatMessage[];
  onError?: (error: Error) => void;
  onFinish?: (message: ChatMessage) => void;
}

export interface UseAIChatReturn {
  messages: Ref<ChatMessage[]>;
  input: Ref<string>;
  status: Ref<"ready" | "streaming">;
  error: Ref<Error | undefined>;
  sendMessage: (content?: string) => Promise<void>;
  clear: () => void;
  setMessages: (messages: ChatMessage[]) => void;
}

export function useAIChat(options: UseAIChatOptions = {}): UseAIChatReturn {
  const messages = ref<ChatMessage[]>(options.initialMessages || []);
  const input = ref<string>("");
  const status = ref<"ready" | "streaming">("ready");
  const error = ref<Error | undefined>();

  const sendMessage = async (content?: string) => {
    const messageContent = content || input.value.trim();

    if (!messageContent) {
      return;
    }

    // Clear input and error
    input.value = "";
    error.value = undefined;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      parts: [{ type: "text", text: messageContent }],
    };
    messages.value.push(userMessage);

    // Create assistant message placeholder
    const assistantMessageId = (Date.now() + 1).toString();
    const assistantMessage: ChatMessage = {
      id: assistantMessageId,
      role: "assistant",
      parts: [{ type: "text", text: "" }],
    };
    messages.value.push(assistantMessage);

    // Set streaming status
    status.value = "streaming";

    try {
      const response = await ragClient.chatStream(messageContent);

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        // Decode the chunk - it comes as raw text chunks from the generator
        const chunk = decoder.decode(value, { stream: true });

        // Append each chunk directly to the assistant message
        const msgIndex = messages.value.findIndex(
          (m) => m.id === assistantMessageId,
        );
        if (msgIndex !== -1) {
          // @ts-expect-error this should be type-checked but whatever
          messages.value[msgIndex].parts[0].text += chunk;
        }
      }

      // Finalize the message
      const finalMessage = messages.value.find(
        (m) => m.id === assistantMessageId,
      );
      if (finalMessage && options.onFinish) {
        options.onFinish(finalMessage);
      }
    } catch (err) {
      const chatError = err instanceof Error ? err : new Error("Unknown error");
      error.value = chatError;

      // Remove the empty assistant message on error
      messages.value = messages.value.filter(
        (m) => m.id !== assistantMessageId,
      );

      if (options.onError) {
        options.onError(chatError);
      }
    } finally {
      status.value = "ready";
    }
  };

  const clear = () => {
    messages.value = options.initialMessages || [];
    input.value = "";
    error.value = undefined;
    status.value = "ready";
  };

  const setMessages = (newMessages: ChatMessage[]) => {
    messages.value = newMessages;
  };

  return {
    messages,
    input,
    status,
    error,
    sendMessage,
    clear,
    setMessages,
  };
}
