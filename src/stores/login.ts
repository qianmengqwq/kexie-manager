import { defineStore } from 'pinia'
import { ref } from 'vue'
import { throttle } from 'lodash-es'
import { loginTypeEnum } from '@/enums'
import { getCodeApi, getEmailCodeApi } from '@/apis/login'

const SENDEMAILDELAY = 60000
export const useLoginStore = defineStore('login', () => {
  const loginType = ref(loginTypeEnum.PASSWORD)
  const codeBase64 = ref('')
  const email = ref('')

  const getCode = async () => {
    const res = await getCodeApi()
    const blob = new Blob([res.data], { type: 'image/png' })
    const reader = new FileReader()
    reader.onload = function (event) {
      const base64String = event.target?.result
      codeBase64.value = base64String as string
    }
    reader.readAsDataURL(blob)
  }

  const getEmailCodeFn = async () => {
    await getEmailCodeApi(email.value)
  }

  const getEmailCode = throttle(getEmailCodeFn, SENDEMAILDELAY, {
    trailing: false,
  })

  return {
    loginType,
    codeBase64,
    getCode,
    getEmailCode,
  }
})
