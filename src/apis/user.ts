import service from '@/libs/axios/http'
import { User, KexieResponse } from '@/types'
enum Api {
  getUserInfo = '/admin/get',
}

const getUserInfoApi = (id: number) =>
  service.get<KexieResponse<User>>(`${Api.getUserInfo}?id=${id}`)

export { getUserInfoApi }
