import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { authGuard } from '@/features/auth/guards'

import authRoute from '../features/auth/router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('./HomeView.vue'),
  },
  {
    path: '/calendar',
    component: () => import('./CalendarView.vue'),
  },
  authRoute,
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(authGuard)

export default router
