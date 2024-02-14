import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfoApi } from '@/apis/user'
import { useStorage } from '@/hooks/useStorage'
export const useUserStore = defineStore(
  'user',
  () => {
    const { getStorage } = useStorage()

    // 先尝试拿一下有的id
    const userId = ref<number>(getStorage('user')?.userId || 0)

    const picUrl = ref<string>('')

    const getUserInfo = async () => {
      if (userId.value === 0) return
      const [e, r] = await getUserInfoApi(userId.value)
      if (!e && r) {
        const { result } = r
        picUrl.value = result.pic
      }
    }

    return { userId, getUserInfo }
  },
  {
    persist: {
      paths: ['userId'],
    },
  },
)
