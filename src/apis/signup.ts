import service from '@/libs/axios/http'
import type { Student, KexieResponse } from '@/types'
enum Api {
  getSignupInfoById = '/user/signup',
  filterSignupInfo = '/activity/filter',
  getfilteredResultById = '/activity/getResultById',
}

const getSignupInfoByIdApi = (actId: string) =>
  service.get<KexieResponse<Student[]>>(`${Api.getSignupInfoById}/${actId}`)

const filterSignupInfoApi = (activityId: string) =>
  service.get<
    KexieResponse<{
      vipCounts: number
      notVipCounts: number
      vip: Student[]
      notVip: Student[]
    }>
  >(`${Api.filterSignupInfo}?activityId=${activityId}`)

const getFilteredResultById = (activityId: string) =>
  service.get<
    KexieResponse<{
      vipCounts: number
      notVipCounts: number
      listVip: Student[]
      listNotVip: Student[]
    }>
  >(`${Api.getfilteredResultById}?activityId=${activityId}`)

export { getSignupInfoByIdApi, filterSignupInfoApi, getFilteredResultById }
