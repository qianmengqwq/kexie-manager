import { createWebHistory, RouteRecordRaw, createRouter } from 'vue-router'
import { useToken } from '@/hooks/useToken'
import { checkLoginApi } from '@/apis/login'
import { throttle } from 'lodash-es'
import { ResponseCodeEnum } from '@/enums'

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

const checkLogin = async () => {
  const [e, r] = await checkLoginApi()
  if (e && !r) {
    if (e.code === ResponseCodeEnum.TOKENEXPIRE) {
      return false
    }
  }
  return true
}

const throttledCheckLogin = throttle(checkLogin, 1000)

router.beforeEach(async (to, from) => {
  const token = getToken()
  if (!token && to.name !== 'login') {
    return { name: 'login' }
  }

  if (token) {
    const res = await throttledCheckLogin()
    if (res && to.name === 'login' && from.name === 'login') {
      return { path: from.path }
    }
  }
})

export default router
