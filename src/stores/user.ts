import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfoApi } from '@/apis/user'
import { useStorage } from '@/hooks/useStorage'
import { useRequest } from 'vue-request'
export const useUserStore = defineStore(
  'user',
  () => {
    const { getStorage } = useStorage()

    // 先尝试拿一下有的id
    const userId = ref<number>(getStorage('user')?.userId || 0)

    const picUrl = ref<string>('')

    const getUserInfo = async () => {
      const result = await getUserInfoApi(userId.value)
    }

    const { data } = useRequest(getUserInfoApi)
    console.log('data',data);
    
    return { userId, getUserInfo }
  },
  {
    persist: {
      paths: ['userId'],
    },
  },
)
