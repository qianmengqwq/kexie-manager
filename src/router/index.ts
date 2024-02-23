import { createWebHistory, RouteRecordRaw, createRouter } from 'vue-router'
import { useToken } from '@/hooks/useToken'
import { checkLoginApi } from '@/apis/login'
import { throttle } from 'lodash-es'
import { checkLoginStatus } from '@/enums'
const { getToken } = useToken()

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
  },
  {
    path: '/',
    redirect: '/create',
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
    path: '/actDetail/:activityid',
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
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/errors/404.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const refreshToken = async () => {
  const [e, r] = await checkLoginApi()
  if (!e && r) {
    if (r.code === checkLoginStatus.LOGGED_OUT) {
      return false
    }
  }
  return true
}

const throttledRefreshToken = throttle(refreshToken, 60000, { trailing: false })

const isLogin = async () => {
  const token = getToken()
  if (!token) return false
  return await throttledRefreshToken()
}

router.beforeEach(async (to) => {
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
  // if (isLogin() && to.name === 'login') {
  //   return { path: from.path }
  // }
})

export default router
