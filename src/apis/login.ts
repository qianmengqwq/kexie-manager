import $http, { instance } from '@/libs/axios/http'
import { LoginRequestData } from '@/types'

enum URL {
  login = '/admin/login',
  logout = '/admin/logout',
  getCode = '/code/getcode',
}

/**
 *
 * @param data 账密登录表单
 * @returns 用户uid
 */
const loginApi = async (data: LoginRequestData) => {
  const { result } = await $http<{ uid: string }>({
    method: 'post',
    url: URL.login,
    data,
  })
  return result
}

/**
 * 退出登录
 */
const logoutApi = async () => {
  await $http({
    method: 'get',
    url: URL.logout,
  })
}

/**
 *
 * @returns 请求的promise
 */
const getCodeApi = async () => {
  // res拿到的是Blob数据
  return await instance({
    method: 'post',
    url: URL.getCode,
    //指定请求的文件类型是blob 默认是json
    responseType: 'blob',
  })
}
export { loginApi, logoutApi, getCodeApi }
