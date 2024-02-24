import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCodeApi, logoutApi } from '@/apis/login'
import { useFileConversion } from '@/hooks/useFileConversion'
import router from '@/router'

const [fileToBase64] = useFileConversion()

export const useLoginStore = defineStore('login', () => {
  const codeBase64 = ref('')
  // getCodeApi采用的是axios实例，因为返回的是blob而非KexieResponse
  const getCode = async () => {
    try {
      const res = await getCodeApi().catch((e: any) => console.error(e))
      if (res) {
        codeBase64.value = await fileToBase64(res.data, 'image/png')
      }
    } catch (err) {
      console.error(err)
    }
  }

  const logout = async () => {
    const [e, r] = await logoutApi()
    if (!e && r) {
      router.push({ name: 'login' })
    }
  }
  return {
    codeBase64,
    getCode,
    logout,
  }
})
