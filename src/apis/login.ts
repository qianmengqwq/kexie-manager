import { $http } from '@/libs/axios/http'
import service from '@/libs/axios/http'
import { LoginRequestData } from '@/types'
enum Api {
  login = '/admin/login',
  logout = '/admin/logout',
  getCode = '/code/getcode',
  getEmailCode = '/admin/sendEmail',
}

const loginApi = (data: LoginRequestData) =>
  $http.post<{ userId: number }>(Api.login, data, undefined, {
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
  $http.get<null>(Api.logout, undefined, { IsShowErrorMsg: true })

// 指定请求的文件类型是blob 默认是json
// 特殊请求之一，直接用的service
const getCodeApi = () =>
  service.post<Blob>(Api.getCode, null, { responseType: 'blob' })

export { loginApi, logoutApi, getCodeApi, getEmailCodeApi }
