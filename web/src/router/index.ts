import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from './HomeView.vue'
import CalendarView from './CalendarView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: HomeView,
  },
  {
    path: '/calendar',
    component: CalendarView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
