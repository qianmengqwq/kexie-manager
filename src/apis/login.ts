import service from '@/libs/axios/http'
import { KexieResponse, LoginRequestData } from '@/types'
enum Api {
  login = '/admin/login',
  logout = '/admin/logout',
  getCode = '/code/getcode',
  getEmailCode = '/admin/sendEmail',
}

const loginApi = (data: LoginRequestData) =>
  service.post<KexieResponse<{ userId: string }>>(Api.login, { data })
const getEmailCodeApi = (email: string) =>
  service.get<KexieResponse<{ userId: string }>>(
    `${Api.getEmailCode}?email=${email}`,
  )
const getCodeApi = () =>
  service.post<Blob>(Api.getCode, null, { responseType: 'blob' })
const logoutApi = () => service.get<KexieResponse<null>>(Api.logout)
//指定请求的文件类型是blob 默认是json
export { loginApi, logoutApi, getCodeApi, getEmailCodeApi }
