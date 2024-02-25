import { $http } from '@/libs/axios/http'
import type { Student } from '@/types'
enum Api {
  getSignupInfoById = '/activity/applymsg',
  filterSignupInfo = '/activity/filter',
  getfilteredResultById = '/activity/getResultById',
  fuzzyApplyPage = '/activity/fuzzyApplyPage',
  judgeSignup = '/activity/setStatus',
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

const getSignUpInfoListApi = (aid: number) =>
  $http.post<{ total: number; rows: Student[] }>(
    Api.fuzzyApplyPage,
    { aid },
    undefined,
  )

const judgeSignupApi = (data: {
  studentId: number
  activityId: number
  status: number
}) =>
  $http.post(Api.judgeSignup, data, undefined, {
    IsShowErrorMsg: true,
    IsShowSuccessMsg: true,
  })

export {
  getSignupInfoByIdApi,
  filterSignupInfoApi,
  getFilteredResultById,
  getSignUpInfoListApi,
  judgeSignupApi,
}
