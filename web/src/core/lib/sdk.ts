// backend endpoints handling

// import { createFetch } from '@vueuse/core'

const fetch = async <T>(input: string, returnValue: T) => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return returnValue
}

export function useAuth() {
  async function login() {
    const response = await fetch('/auth/login', {
      status: 200,
    })

    return response
  }

  async function register() {
    const response = await fetch('/auth/register', {
      status: 200,
    })
  }

  // assuming we're using stateless auth
  async function refreshToken() {}

  async function getCurrentUser() {}

  return {
    login,
    register,
    refreshToken,
    getCurrentUser,
  }
}
