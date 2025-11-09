import type { User } from '@/features/auth/stores/user-store'
import { createFetch } from '@vueuse/core'

export const useAPIFetch = createFetch({
  baseUrl: import.meta.env.VITE_API_GATEWAY_URL,
  options: {
    async beforeFetch({ options }) {
      options.headers = {
        ...options.headers,
        'Content-Type': 'application/json',
      }
      return { options }
    },
  },
  fetchOptions: {
    mode: 'cors',
  },
})

const apiUrl = (path: string) => {
  return new URL(path, import.meta.env.VITE_API_GATEWAY_URL).toString()
}

const fetchData = async (path: string, init?: RequestInit | undefined) => {
  const response = await globalThis.fetch(apiUrl(path), init)

  const json = await response.json()

  return json
}

interface Credentials {
  email: string
  password: string
}

export function useAuth() {
  async function login(credentials: Credentials): Promise<User> {
    const data = fetchData('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
    return data
  }

  async function register(credentials: Credentials): Promise<User> {
    const data = fetchData('/auth/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
    return data
  }

  // assuming we're using stateless auth
  async function refreshToken() {}

  async function getCurrentUser() {
    const data = fetchData('/users/me')
    return data
  }

  return {
    login,
    register,
    refreshToken,
    getCurrentUser,
  }
}
