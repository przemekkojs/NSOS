import type { NavigationGuardWithThis } from 'vue-router'
import { useUserStore } from '@/features/auth/stores/user-store'

export const authGuard: NavigationGuardWithThis<unknown> = (to) => {
  const userStore = useUserStore()

  if (to.path === '/login' && userStore.isAuthenticated) {
    return {
      path: '/',
    }
  } else if (!userStore.isAuthenticated && to.path !== '/login') {
    return {
      path: '/login',
    }
  }
}
