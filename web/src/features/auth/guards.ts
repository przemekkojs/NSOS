import type { NavigationGuardWithThis } from 'vue-router'
import { useUserStore } from '@/features/auth/stores/user-store'

export const authGuard: NavigationGuardWithThis<unknown> = (to) => {
  const userStore = useUserStore()

  if (!userStore.isAuthenticated && to.path !== '/auth/login') {
    return {
      path: '/auth/login',
    }
  }
}
