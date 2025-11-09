import { defineStore } from 'pinia'

interface AnonymousUser {
  id: 'anonymous'
  role: 'unauthenticated'
}

export interface User {
  id: number
  name: string
  role: 'admin' | 'employee' | 'student'
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
  storage: import.meta.env.DEV ? 'localStorage' : undefined,
})
