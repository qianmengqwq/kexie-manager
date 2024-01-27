import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { KexieResponse } from '@/types'
import { ResponseCodeEnum } from '@/enums'
const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 3000,
  //后端token给在cookie里
  withCredentials: true,
})

const $http = async <T = any>(
  config: AxiosRequestConfig,
): Promise<KexieResponse<T>> => {
  try {
    const { data } = await instance.request<KexieResponse<T>>(config)
    data.code === ResponseCodeEnum.SUCCESS
      ? console.log(data.msg) // 成功消息提示
      : console.error(data.msg) // 失败消息提示
    return data
  } catch (err) {
    const msg = (err as Error).message
    console.log(msg)
    return {
      code: -1,
      msg,
      data: null as any,
    }
  }
}

export default $http
