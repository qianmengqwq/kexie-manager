import { $http } from '@/libs/axios/http'
import axios from 'axios'
import { User } from '@/types'

enum Api {
  getUserInfo = '/admin/get',
  uploadAvatar = '/admin/adminPic',
  register = '/admin/regis',
}

const getUserInfoApi = (id: number) =>
  $http.get<User>(`${Api.getUserInfo}?id=${id}`)

const uploadAvatarApi = (data: FormData) =>
  $http.post<string>(Api.uploadAvatar, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

const getPicApi = (picUrl: string) => {
  const url = picUrl.replace('https://kexie.cos.wuster.world', '')
  return axios.get<Blob>(`/getPic/${url}`, { responseType: 'blob' })
}

const registerApi = (data: User) =>
  $http.post(Api.register, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

export { getUserInfoApi, uploadAvatarApi, getPicApi, registerApi }
