import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { throttle } from 'lodash-es'
import { loginTypeEnum } from '@/enums'
import { getCodeApi, getEmailCodeApi, logoutApi } from '@/apis/login'
import { useUserStore } from '@/stores'
import { useFileConversion } from '@/hooks/useFileConversion'
import router from '@/router'

// 发送验证码的间隔
const SENDEMAILDELAY = 60000

const [fileToBase64] = useFileConversion()

export const useLoginStore = defineStore('login', () => {
  const loginType = ref(loginTypeEnum.PASSWORD)
  const codeBase64 = ref('')
  const email = ref('')

  const { userId } = storeToRefs(useUserStore())

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

  const getEmailCodeFn = async () => {
    await getEmailCodeApi(email.value)
  }

  const getEmailCode = throttle(getEmailCodeFn, SENDEMAILDELAY, {
    trailing: false,
  })

  const logout = async () => {
    const [e, r] = await logoutApi()
    if (!e && r) {
      // 重置userId
      // pinia持久化，没有直接操作，可以实现重置为0但不会清除掉那一项
      userId.value = 0
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
