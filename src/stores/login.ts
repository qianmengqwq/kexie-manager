import { defineStore } from 'pinia'
import { ref } from 'vue'
import { throttle } from 'lodash-es'
import { loginTypeEnum } from '@/enums'
import { getCodeApi, getEmailCodeApi, logoutApi } from '@/apis/login'
import router from '@/router'

// 发送验证码的间隔
const SENDEMAILDELAY = 60000

export const useLoginStore = defineStore('login', () => {
  const loginType = ref(loginTypeEnum.PASSWORD)
  const codeBase64 = ref('')
  const email = ref('')

  // getCodeApi采用的是axios实例，因为返回的是blob而非KexieResponse
  const getCode = async () => {
    try {
      const res = await getCodeApi().catch((e: any) => console.error(e))
      if (res) {
        const blob = new Blob([res.data], { type: 'image/png' })
        const reader = new FileReader()
        reader.onload = function (event) {
          const base64String = event.target?.result
          codeBase64.value = base64String as string
        }
        reader.readAsDataURL(blob)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const getEmailCodeFn = async () => {
    await getEmailCodeApi(email.value)
  }

  const getEmailCode = throttle(getEmailCodeFn, SENDEMAILDELAY, {
    trailing: false,
  })

  const logout = async () => {
    const [e, r] = await logoutApi()
    if (!e && r) {
      router.push({ name: 'login' })
    }
  }
  return {
    loginType,
    codeBase64,
    getEmailCode,
    getCode,
    logout,
  }
})
