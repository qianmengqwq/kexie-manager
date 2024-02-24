import { $http } from '@/libs/axios/http'
import service from '@/libs/axios/http'
import { LoginRequestData } from '@/types'
enum Api {
  login = '/admin/login',
  logout = '/admin/logout',
  getCode = '/code/getcode',
  getEmailCode = '/admin/sendEmail',
  getPower = '/admin/openSafe',
  checkLogin = '/code/checkLogin',
}

const loginApi = (data: LoginRequestData) =>
  $http.post<{ uid: number }>(Api.login, data, undefined, {
    IsShowSuccessMsg: true,
    IsShowErrorMsg: true,
  })

const getEmailCodeApi = (email: string) =>
  $http.get<{ userId: string }>(
    `${Api.getEmailCode}?email=${email}`,
    undefined,
    {
      IsShowSuccessMsg: true,
      IsShowErrorMsg: true,
    },
  )

const logoutApi = () =>
  $http.get<null>(Api.logout, undefined, {
    IsShowErrorMsg: true,
    IsShowSuccessMsg: true,
  })

// 指定请求的文件类型是blob 默认是json
// 特殊请求之一，直接用的service
const getCodeApi = () =>
  service.post<Blob>(Api.getCode, null, { responseType: 'blob' })

// 二次验证授权
const getPowerApi = (password: string) =>
  $http.get(`${Api.getPower}?password=${password}`, undefined, {
    IsShowSuccessMsg: true,
    IsShowErrorMsg: true,
  })
// 防止被挤下线，但是还认token的情况
const checkLoginApi = () => $http.post<null>(Api.checkLogin, {})

export {
  loginApi,
  logoutApi,
  getCodeApi,
  getEmailCodeApi,
  getPowerApi,
  checkLoginApi,
}
