import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from './HomeView.vue'
import CalendarView from './CalendarView.vue'
import { authGuard } from '@/features/auth/guards'

import authRoute from '../features/auth/router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: HomeView,
  },
  {
    path: '/calendar',
    component: CalendarView,
  },
  authRoute,
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(authGuard)

export default router
