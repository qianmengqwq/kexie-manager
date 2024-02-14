import { $http } from '@/libs/axios/http'
import { User } from '@/types'
enum Api {
  getUserInfo = '/admin/get',
}

const getUserInfoApi = (id: number) =>
  $http.get<User>(`${Api.getUserInfo}?id=${id}`)

export { getUserInfoApi }
