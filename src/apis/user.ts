import $http from '@/libs/axios/http'
import { User } from '@/types'
enum Api {
  getUserInfo = '/admin/get',
}

const getUserInfoApi = async (id: number) => {
  const { result } = await $http<User>({
    method: 'get',
    url: `${Api.getUserInfo}?id=${id}`,
  })
  return result
}

export { getUserInfoApi }
