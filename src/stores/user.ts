import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfoApi } from '@/apis/user'
export const useUserStore = defineStore(
  'user',
  () => {
    const userId = ref(0)
    const picUrl = ref('')

    const getUserInfo = async () => {
      const result = await getUserInfoApi(userId.value)
      if (result) picUrl.value = result.pic
    }
    return { userId, getUserInfo }
  },
  {
    persist: {
      paths: ['userId'],
    },
  },
)
