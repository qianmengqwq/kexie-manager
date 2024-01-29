import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserStore = defineStore(
  'user',
  () => {
    const userId = ref('')
    return { userId }
  },
  {
    persist: {
      paths: ['userId'],
    },
  },
)
