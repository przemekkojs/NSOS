import { defineStore } from 'pinia'
import type { User } from '@/core/types'

interface AnonymousUser {
  id: 'anonymous'
  role: 'unauthenticated'
}

export const useUserStore = defineStore('user', {
  state: (): User | AnonymousUser => ({
    id: 'anonymous',
    role: 'unauthenticated',
  }),
  getters: {
    isAuthenticated(state): boolean {
      return state.role !== 'unauthenticated'
    },
  },
  actions: {
    logout() {
      this.$reset()
    },
  },
  storage: import.meta.env.DEV ? 'localStorage' : undefined,
})
