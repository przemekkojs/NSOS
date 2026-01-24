export interface AllauthRequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: BodyInit | Record<string, unknown>;
  headers?: Record<string, string>;
  skipCsrf?: boolean;
  query?: Record<string, unknown>;
  [key: string]: unknown;
}

export type Paginated<T> = {
  count: number;
  next: number;
  previous: number;
  results: T[];
};

export class AllauthApiClient {
  private baseURL: string | undefined;

  constructor(baseURL?: string) {
    this.baseURL = baseURL;
  }

  private getCsrfToken(): string | null {
    if (import.meta.server) return null;
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === "csrftoken" && value) {
        return decodeURIComponent(value);
      }
    }
    return null;
  }

  async request<T = unknown>(
    endpoint: string,
    options: AllauthRequestOptions = {},
  ) {
    const csrfToken = this.getCsrfToken();
    const method = options.method || "GET";
    const needsCsrf = ["POST", "PUT", "PATCH", "DELETE"].includes(method);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };

    if (needsCsrf && !options.skipCsrf && csrfToken) {
      headers["X-CSRFToken"] = csrfToken;
    }

    return $fetch<T>(this.getApiUrl(endpoint), {
      method,
      headers,
      body: options.body,
      query: options.query,
      credentials: "include",
    });
  }

  get<T>(endpoint: string, options: AllauthRequestOptions = {}) {
    options.skipCsrf = endpoint.includes("/auth/session");

    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  post<T>(endpoint: string, data?: unknown, options?: AllauthRequestOptions) {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  put<T>(endpoint: string, data?: unknown, options?: AllauthRequestOptions) {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  patch<T>(endpoint: string, data?: unknown, options?: AllauthRequestOptions) {
    return this.request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  delete<T>(endpoint: string, options?: AllauthRequestOptions) {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }

  getApiUrl(endpoint: string): string {
    if (!this.baseURL) {
      this.baseURL = useRuntimeConfig().public.apiUrl;
    }

    return `${this.baseURL}${endpoint}`;
  }

  getToken(): string | null {
    return this.getCsrfToken();
  }

  setBaseURL(url: string): void {
    this.baseURL = url;
  }
}

export const apiClient = new AllauthApiClient();
