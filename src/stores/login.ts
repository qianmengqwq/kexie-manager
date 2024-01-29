import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginTypeEnum } from '@/enums'
import { getCodeApi } from '@/apis/login'
export const useLoginStore = defineStore('login', () => {
  const loginType = ref(loginTypeEnum.PASSWORD)
  const codeBase64 = ref('')

  const getCode = async () => {
    const res = await getCodeApi()
    console.log('res', res)

    const blob = new Blob([res.data], { type: 'image/png' })
    const reader = new FileReader()
    reader.onload = function (event) {
      const base64String = event.target?.result
      codeBase64.value = base64String as string
    }
    reader.readAsDataURL(blob)
  }
  return {
    loginType,
    codeBase64,
    getCode,
  }
})
