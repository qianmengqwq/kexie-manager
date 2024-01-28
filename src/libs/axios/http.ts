import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { KexieResponse } from '@/types'
import { ResponseCodeEnum } from '@/enums'
import { message } from 'ant-design-vue'
const instance: AxiosInstance = axios.create({
  baseURL: '/api',
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
      ? message.success(data.msg || '操作成功')
      : message.warning(data.msg || '操作失败')
    return data
  } catch (err) {
    const msg = (err as Error).message
    message.error(msg || '网络错误')
    return {
      code: ResponseCodeEnum.SYSTEMERROR,
      msg,
      result: null as any,
    }
  }
}

// 封装的不够完备-全局的异常处理在遇到不是code、msg、result的时候会拦截，然而有部分接口不是这种情况的
// 例如getCodeApi。因此这里把实例暴露出去单独做处理
export { instance }
export default $http
