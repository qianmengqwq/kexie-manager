import { createWebHistory, RouteRecordRaw, createRouter } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login.vue'),
  },
  {
    path: '/',
    component: () => import('@/views/layout/layout.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
