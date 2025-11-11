import type { NavigationGuardWithThis } from 'vue-router'
import { useUserStore } from '@/features/auth/stores/user-store'

const authRoutes = ['/login', '/register']

export const authGuard: NavigationGuardWithThis<unknown> = (to) => {
  const userStore = useUserStore()

  if (authRoutes.includes(to.path) && userStore.isAuthenticated) {
    return {
      path: '/',
    }
  } else if (!userStore.isAuthenticated && !authRoutes.includes(to.path)) {
    return {
      path: '/login',
    }
  }
}
