import { createWebHistory, RouteRecordRaw, createRouter } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login.vue'),
  },
  {
    path: '/',
    component: () => import('@/views/layout/homeView.vue'),
    children: [
      {
        path: 'create',
        component: () => import('@/views/createAct.vue'),
      },
      {
        path: 'saved',
        component: () => import('@/views/savedAct.vue'),
      },
      {
        path: 'posted',
        component: () => import('@/views/postedAct.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
