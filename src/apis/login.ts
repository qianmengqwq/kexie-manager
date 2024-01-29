import $http, { instance } from '@/libs/axios/http'
import { LoginRequestData } from '@/types'

enum Api {
  login = '/admin/login',
  logout = '/admin/logout',
  getCode = '/code/getcode',
}

const loginApi = async (data: LoginRequestData) => {
  const { result } = await $http<{ uid: string }>({
    method: 'post',
    url: Api.login,
    data,
  })
  return result
}

const logoutApi = async () => {
  await $http({
    method: 'get',
    url: Api.logout,
  })
}

const getCodeApi = async () => {
  // res拿到的是Blob数据
  return await instance({
    method: 'post',
    url: Api.getCode,
    //指定请求的文件类型是blob 默认是json
    responseType: 'blob',
  })
}
export { loginApi, logoutApi, getCodeApi }
