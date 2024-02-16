import { $http } from '@/libs/axios/http'
import type { Student } from '@/types'
enum Api {
  getSignupInfoById = '/user/signup',
  filterSignupInfo = '/activity/filter',
  getfilteredResultById = '/activity/getResultById',
}

const getSignupInfoByIdApi = (actId: number) =>
  $http.get<Student[]>(`${Api.getSignupInfoById}?activityId=${actId}`)

const filterSignupInfoApi = (activityId: number) =>
  $http.get<{
    vipCounts: number
    notVipCounts: number
    vip: Student[]
    notVip: Student[]
  }>(`${Api.filterSignupInfo}?activityId=${activityId}`, undefined, {
    IsShowErrorMsg: true,
    IsShowSuccessMsg: true,
  })

const getFilteredResultById = (activityId: number) =>
  $http.get<{
    vipCounts: number
    notVipCounts: number
    listVip: Student[]
    listNotVip: Student[]
  }>(`${Api.getfilteredResultById}?activityId=${activityId}`)

export { getSignupInfoByIdApi, filterSignupInfoApi, getFilteredResultById }
