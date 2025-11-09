import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from '@/features/auth/guards'

import { routes, handleHotUpdate } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

if (import.meta.hot) {
  handleHotUpdate(router)
}

router.beforeEach(authGuard)

export default router
