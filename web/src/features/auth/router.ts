import type { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/auth',
  component: () => import('./layout.vue'),
  children: [
    {
      path: 'login',
      component: () => import('./pages/login.vue'),
    },
    {
      path: 'register',
      component: () => import('./pages/register.vue'),
    },
  ],
}

export default route
