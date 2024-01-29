import $http from '@/libs/axios/http'
import type { Student } from '@/types'
enum Api {
  getSignupInfoById = '/user/signup',
  filterSignupInfo = '/activity/filter',
  getfilteredResultById = '/activity/getResultById',
}

const getSignupInfoByIdApi = async (actId: string) => {
  const { result } = await $http<Student[]>({
    method: 'get',
    url: `${Api.getSignupInfoById}/${actId}`,
  })
  return result
}

const filterSignupInfoApi = async (activityId: string) => {
  const { result } = await $http<{
    vipCounts: number
    notVipCounts: number
    vip: Student[]
    notVip: Student[]
  }>({
    method: 'get',
    url: `${Api.filterSignupInfo}?activityId=${activityId}`,
  })
  return result
}

const getFilteredResultById = async (activityId: string) => {
  const { result } = await $http<{
    vipCounts: number
    notVipCounts: number
    listVip: Student[]
    listNotVip: Student[]
  }>({
    method: 'get',
    url: `${Api.getfilteredResultById}?activityId=${activityId}`,
  })
  return result
}
export { getSignupInfoByIdApi, filterSignupInfoApi, getFilteredResultById }
