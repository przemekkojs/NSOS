import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { authGuard } from '@/features/auth/guards'

// import authRoute from '../../features/auth/router'
// import institutionsRoutes from '../../features/institutions/router'
// import employeesRoutes from '../../features/employees/router'
import { routes, handleHotUpdate } from 'vue-router/auto-routes'

// const routes: RouteRecordRaw[] = [
//   {
//     path: '/',
//     component: () => import('../layouts/DashboardLayout.vue'),
//     children: [
//       {
//         path: '',
//         name: 'dashboard',
//         component: () => import('./HomeView.vue'),
//       },
//       {
//         path: '/harmonogram',
//         name: 'harmonogram',
//         component: () => import('./CalendarView.vue'),
//       },
//       institutionsRoutes,
//       employeesRoutes,
//     ],
//   },
//   authRoute,
//   {
//     path: '/:pathMatch(.*)*',
//     name: 'NotFound',
//     component: () => import('./NotFound.vue'),
//   },
// ]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

if (import.meta.hot) {
  handleHotUpdate(router)
}

router.beforeEach(authGuard)

export default router
