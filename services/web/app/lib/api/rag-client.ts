export interface RagRequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: BodyInit | Record<string, unknown>;
  headers?: Record<string, string>;
  query?: Record<string, unknown>;
  [key: string]: unknown;
}

export class RagApiClient {
  private baseURL: string | undefined;

  constructor(baseURL?: string) {
    this.baseURL = baseURL;
  }

  async request<T = unknown>(
    endpoint: string,
    options: RagRequestOptions = {}
  ) {
    const method = options.method || "GET";
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };

    return $fetch<T>(this.getApiUrl(endpoint), {
      method,
      headers,
      body: options.body,
      query: options.query,
    });
  }

  get<T>(endpoint: string, options: RagRequestOptions = {}) {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  post<T>(endpoint: string, data?: unknown, options?: RagRequestOptions) {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  put<T>(endpoint: string, data?: unknown, options?: RagRequestOptions) {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  patch<T>(endpoint: string, data?: unknown, options?: RagRequestOptions) {
    return this.request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  delete<T>(endpoint: string, options?: RagRequestOptions) {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }

  getApiUrl(endpoint: string): string {
    if (!this.baseURL) {
      this.baseURL = useRuntimeConfig().public.ragUrl;
    }
    return `${this.baseURL}${endpoint}`;
  }

  setBaseURL(url: string): void {
    this.baseURL = url;
  }

  // RAG-specific methods
  async chat(question: string) {
    return this.post<{ answer: string }>("/chat", { question });
  }

  async chatStream(question: string) {
    const url = this.getApiUrl("/chat-stream");
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });
  }

  async healthCheck() {
    return this.get<{ status: string; service: string }>("/health");
  }
}

export const ragClient = new RagApiClient();
