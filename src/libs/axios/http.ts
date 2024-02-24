import { message } from 'ant-design-vue'
import axios from 'axios'
// import axiosRetry from 'axios-retry'
import { AxiosInstance } from 'axios'
import { ResponseCodeEnum } from '@/enums'
import type { KexieResponse } from '@/types'
import type { AxiosRequestConfig } from 'axios'
import router from '@/router'

interface ExtendAxiosParams {
  IsShowErrorMsg?: boolean
  IsShowSuccessMsg?: boolean
}
const service: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  //后端token给在cookie里
  withCredentials: true,
})

// 封装一个请求类，有get和post方法
// 使用[e,r]的方式直接拿到错误or数据
// 扩展params以实现对请求的msg交互预定义
const $http = {
  get<T>(
    url: string,
    params?: AxiosRequestConfig,
    extendParams?: ExtendAxiosParams,
  ): Promise<[any, KexieResponse<T> | undefined]> {
    return new Promise((resolve) => {
      service
        .get<KexieResponse<T>>(url, params)
        .then((result) => {
          const res = result.data
          // 判断业务成功，不是的话扔到catch分支处理
          if (res.code !== ResponseCodeEnum.SUCCESS) {
            throw res
          }
          handleRequestMsg(extendParams?.IsShowSuccessMsg, 'success', res?.msg)
          resolve([null, res])
        })
        .catch((error) => {
          handleRequestMsg(extendParams?.IsShowErrorMsg, 'error', error?.msg)
          resolve([error, undefined])
        })
    })
  },
  post<T>(
    url: string,
    data: object,
    params?: AxiosRequestConfig,
    extendParams?: ExtendAxiosParams,
  ): Promise<[any, KexieResponse<T> | undefined]> {
    return new Promise((resolve) => {
      service
        .post<KexieResponse<T>>(url, data, params)
        .then((result) => {
          const res = result.data
          // 判断业务成功，不是的话扔到catch分支处理
          if (res.code !== ResponseCodeEnum.SUCCESS) {
            throw res
          }
          handleRequestMsg(extendParams?.IsShowSuccessMsg, 'success', res?.msg)
          resolve([null, res])
        })
        .catch((error) => {
          handleRequestMsg(
            extendParams?.IsShowErrorMsg,
            'error',
            error.message || error.msg || undefined,
          )
          resolve([error, undefined])
        })
    })
  },
}

const handleRequestMsg = (
  state: boolean | undefined,
  type: 'success' | 'error',
  msg: string,
) => {
  if (!state) return
  message[type](msg || `${type === 'success' ? '成功' : '失败'}`)
}

service.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.data.msg.includes('token')) {
      router.push({ name: 'login' })
      message.error(error.response.data.msg)
    }

    if (error?.message?.includes?.('timeout')) {
      message.error('网络错误!')
    } else {
      console.log(error)
    }
    return Promise.reject(error)
  },
)

// 仍旧保留只暴露实例的形式，以处理一些非KexieResponse的res
export default service
export { $http }
