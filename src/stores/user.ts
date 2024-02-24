import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfoApi, uploadAvatarApi } from '@/apis/user'
import Cookies from 'js-cookie'
import { StorageLike } from 'pinia-plugin-persistedstate'
import { useStorage } from '@/hooks/useStorage'
import type { User } from '@/types'

// 属于二次验证的Storage，使用pinia持久化存储，目前只能定死expires无法复用，暂未找到更好的解决方案
const cookieStorage: StorageLike = {
  getItem: (key) => {
    const value = Cookies.get(key)
    if (!value) return null
    return value!
  },
  setItem: (key, value) =>
    Cookies.set(key, value, { expires: new Date(Date.now() + 6 * 60 * 1000) }),
}

const { getStorage } = useStorage()
const { getStorage: getSessionStorage } = useStorage('sessionStorage')

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<User>(
      getStorage('userInfo') || getSessionStorage('userInfo') || ({} as User),
    )

    const notifyNum = ref<number>(0)

    const hasVerifiedTwice = ref<boolean>(false)

    const getUserInfo = async (userId: number) => {
      if (userId === 0) return
      const [e, r] = await getUserInfoApi(userId)
      if (!e && r) {
        const { result } = r
        userInfo.value = result
      }
    }

    const uploadAvatar = async (file: File) => {
      const form = new FormData()
      form.append('file', file)
      form.append('uid', userInfo.value.id.toString())
      const [e, r] = await uploadAvatarApi(form)
      if (!e && r) {
        getUserInfo(userInfo.value.id)
      }
    }

    return {
      notifyNum,
      userInfo,
      hasVerifiedTwice,
      getUserInfo,
      uploadAvatar,
    }
  },
  {
    //需要过期的都存在cookie里
    //token的操作后端已经实现
    persist: {
      paths: ['hasVerifiedTwice'],
      storage: cookieStorage,
    },
  },
)
