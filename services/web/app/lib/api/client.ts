import { APIError } from "./api-error";
import { useRuntimeConfig } from "#app";

const getCSRFToken = (): string | undefined => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken="))
    ?.split("=")[1];
};

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    skipCSRF = false,
  ): Promise<T> {
    const runtimeConfig = useRuntimeConfig();
    const baseUrl = runtimeConfig.public.apiUrl;
    const url = `${baseUrl}${endpoint}`;

    let csrftoken = getCSRFToken();

    if (!csrftoken && !skipCSRF) {
      await fetch(`${baseUrl}/_allauth/browser/v1/auth/session`, {
        credentials: "include",
      });

      csrftoken = getCSRFToken();
      if (!csrftoken) {
        throw new Error("Failed to obtain CSRF token");
      }
    }

    const response = await fetch(url, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken ?? "",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = new APIError({
        status: response.status,
        message: "API Error",
        data: await response.json().catch(() => ({})),
      });

      throw error;
    }

    return response.json();
  }

  get<T>(endpoint: string, options?: RequestInit) {
    const skipCSRF = endpoint.includes("/auth/session");
    return this.request<T>(endpoint, { ...options, method: "GET" }, skipCSRF);
  }

  post<T>(endpoint: string, data?: unknown, options?: RequestInit) {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  put<T>(endpoint: string, data?: unknown, options?: RequestInit) {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  patch<T>(endpoint: string, data?: unknown, options?: RequestInit) {
    return this.request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  delete<T>(endpoint: string, options?: RequestInit) {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}

export const apiClient = new ApiClient();
