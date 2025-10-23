import { defineStore } from 'pinia'

interface User {
  name: string
  role: 'admin' | 'employee' | 'student' | 'unauthenticated'
}

export const useUserStore = defineStore('user', {
  state: (): User => ({ name: 'Eduardo', role: 'unauthenticated' }),
  getters: {
    isAuthenticated(state): boolean {
      return state.role !== 'unauthenticated'
    },
  },
})
