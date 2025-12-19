<script setup lang="ts">
import { getTextFromMessage } from "@nuxt/ui/runtime/utils/ai.js";
import MDC from "./ui/MDC.vue";
// @ts-expect-error FIXME: the following type
import type { UIMessage } from "ai";

const { t } = useI18n();

const messages = ref<UIMessage[]>([
  {
    id: "1",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: t("feature.chat.helloMessage"),
      },
    ],
  },
]);
const input = ref<string>("");
const status = ref<"ready" | "streaming">("ready");
const error = ref<Error | undefined>();

const { isAIChatOpen } = useDashboard();

function onSubmit() {
  const trimmedInput = input.value.trim();
  if (trimmedInput) {
    messages.value.push({
      id: Date.now().toString(),
      role: "user",
      parts: [
        {
          type: "text",
          text: trimmedInput,
        },
      ],
    });
    input.value = "";
  }
}
</script>
<template>
  <USlideover v-model:open="isAIChatOpen">
    <UTooltip :text="$t('feature.chat.tooltip')" :shortcuts="['C']">
      <UButton
        icon="i-lucide-bot-message-square"
        color="neutral"
        variant="ghost"
        class="cursor-pointer"
      />
    </UTooltip>

    <template #content>
      <UChatPalette>
        <UChatMessages
          :messages="messages"
          :status="status"
          :user="{
            side: 'right',
            variant: 'soft',
            // FIXME: replace with actual user avatar
            // avatar: { src: user.avatarUrl },
          }"
          :assistant="{
            icon: 'i-lucide-bot',
            side: 'left',
            variant: 'outline',
            actions: [
              {
                label: $t('feature.chat.copyToClipboard'),
                icon: 'i-lucide-copy',
              },
            ],
          }"
        >
          <template #content="{ message }">
            <MDC :content="getTextFromMessage(message)" />
          </template>
        </UChatMessages>

        <template #prompt>
          <UChatPrompt
            v-model="input"
            icon="i-lucide-search"
            variant="naked"
            :error="error"
            :placeholder="$t('feature.chat.placeholder')"
            :disabled="status === 'streaming'"
            @submit="onSubmit"
          />
        </template>
      </UChatPalette>
    </template>
  </USlideover>
</template>
