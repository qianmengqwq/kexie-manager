import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfoApi, uploadAvatarApi, getPicApi } from '@/apis/user'
import { useFileConversion } from '@/hooks/useFileConversion'
import { useStorage } from '@/hooks/useStorage'
import type { User } from '@/types'

const [fileToBase64] = useFileConversion()
export const useUserStore = defineStore(
  'user',
  () => {
    const { getStorage } = useStorage()

    // 先尝试拿一下有的id
    const userId = ref<number>(getStorage('user')?.userId || 0)

    const avatar = ref<string>()
    const base64Avatar = ref<string>('')
    const userInfo = ref<User>({} as User)

    const notifyNum = ref<number>(0)

    const getUserInfo = async () => {
      if (userId.value === 0) return
      const [e, r] = await getUserInfoApi(userId.value)
      if (!e && r) {
        const { result } = r
        userInfo.value = result
        avatar.value = result.pic
      }
    }

    const uploadAvatar = async (file: File) => {
      const form = new FormData()
      form.append('file', file)
      form.append('uid', userId.value.toString())
      const [e, r] = await uploadAvatarApi(form)
      if (!e && r) {
        getUserInfo().then(getPic)
      }
    }

    const getPic = async () => {
      try {
        const res = await getPicApi(avatar.value as string).catch((e) => {
          console.error(e)
        })
        console.log(res)

        if (res) {
          base64Avatar.value = await fileToBase64(res.data, '').catch((e) => {
            console.error(e)
            return ''
          })
          console.log('base64Avatar', base64Avatar.value)
        }
      } catch (err) {
        console.error(err)
      }
    }
    return {
      userId,
      notifyNum,
      userInfo,
      avatar,
      base64Avatar,
      getUserInfo,
      uploadAvatar,
      getPic,
    }
  },
  {
    persist: {
      paths: ['userId'],
    },
  },
)
