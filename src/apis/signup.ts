import $http from '@/libs/axios/http'
import type { Student } from '@/types'
enum Api {
  getSignupInfo = '/user/signup',
}

const getSignupInfoByActIdApi = async (actId: string) => {
  const { result } = await $http<Student[]>({
    method: 'get',
    url: `${Api.getSignupInfo}/${actId}`,
  })
  return result
}

export { getSignupInfoByActIdApi }
