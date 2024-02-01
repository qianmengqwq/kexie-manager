import axios from 'axios'
import { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios'
import type { KexieResponse } from '@/types'
import { ResponseCodeEnum } from '@/enums'
import { message } from 'ant-design-vue'
const instance: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  //后端token给在cookie里
  withCredentials: true,
})

// version 1
const $http = async <T = any>(
  config: AxiosRequestConfig,
): Promise<KexieResponse<T>> => {
  try {
    const { data } = await instance.request<KexieResponse<T>>(config)
    // 业务层面拦截
    data.code === ResponseCodeEnum.SUCCESS
      ? message.success(data.msg || '操作成功')
      : message.warning(data.msg || '操作失败')
    return data
  } catch (err) {
    // 这里不可以为error配置类型，因为任何类型的错误都可能被抛出
    // axios拦截
    err instanceof AxiosError
      ? message.error(err?.response?.data.msg)
      : message.error('网络错误!')

    return {
      code: ResponseCodeEnum.SYSTEMERROR,
      msg: '网络错误!',
      result: null as any,
    }
  }
}

// version 2

// instance.interceptors.request.use(
//   (config) => {
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   },
// )

// 响应拦截器
// instance.interceptors.response.use(
//   (response) => {
//     const data = response.data
//     // 业务层面的拦截
//     data.code === ResponseCodeEnum.SUCCESS
//       ? message.success(data.msg || '操作成功')
//       : message.warning(data.msg || '操作失败')
//     return data
//   },
//   (error) => {
//     // 对响应错误的处理
//     if (error instanceof AxiosError) {
//       message.error(error?.response?.data.msg)
//     } else {
//       message.error('网络错误！')
//     }
//     return Promise.reject(error)
//   },
// )

// export const $http = async <T = any>(
//   config: AxiosRequestConfig,
// ): Promise<KexieResponse<T>> => {
//   try {
//     const { data } = await instance.request<KexieResponse<T>>(config)
//     return data
//   } catch (err) {
//     return {
//       code: ResponseCodeEnum.SYSTEMERROR,
//       msg: '网络错误!',
//       result: null as any,
//     }
//   }
// }

// 封装的不够完备-全局的异常处理在遇到不是code、msg、result的时候会拦截，然而有部分接口不是这种情况的
// 例如getCodeApi。因此这里把实例暴露出去单独做处理
export { instance }
export default $http
