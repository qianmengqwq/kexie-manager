import { createWebHistory, RouteRecordRaw, createRouter } from 'vue-router'
import { useToken } from '@/hooks/useToken'
const { getToken } = useToken()

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
  },
  {
    path: '/',
    component: () => import('@/views/layout/homeView.vue'),
    children: [
      {
        path: 'create',
        name: 'create',
        meta: { title: '创建新的活动' },
        component: () => import('@/views/createAct.vue'),
      },
      {
        path: 'saved',
        name: 'saved',
        meta: { title: '已保存的活动' },
        component: () => import('@/views/savedAct.vue'),
      },
      {
        path: 'posted',
        name: 'posted',
        meta: { title: '已发布的活动' },
        component: () => import('@/views/postedAct.vue'),
      },
      {
        path: 'infoExtraction',
        name: 'infoExtraction',
        meta: { title: '报名信息审核' },
        component: () => import('@/views/infoExtraction.vue'),
      },
    ],
  },
  {
    path: '/actDetail',
    name: 'actDetail',
    meta: { title: '活动详情' },
    component: () => import('@/views/actDetail.vue'),
  },
  {
    path: '/preview',
    name: 'preview',
    meta: { title: '活动内容预览' },
    component: () => import('@/views/preview.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const isLogin = () => {
  const token = getToken()

  return !!token
}
router.beforeEach(async (to, from) => {
  if (
    // 检查用户是否已登录
    !isLogin() &&
    // ❗️ 避免无限重定向
    to.name !== 'login'
  ) {
    // 将用户重定向到登录页面
    return { name: 'login' }
  }

  // 已登录不让再次登录
  if (isLogin() && to.name === 'login') {
    return { name: from.name }
  }
})

export default router
