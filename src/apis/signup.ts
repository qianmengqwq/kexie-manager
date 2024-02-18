import { $http } from '@/libs/axios/http'
import type { PageParam, Student } from '@/types'
enum Api {
  getSignupInfoById = '/user/signup',
  filterSignupInfo = '/activity/filter',
  getfilteredResultById = '/activity/getResultById',
  fuzzyApplyPage = '/activity/fuzzyApplyPage',
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

const getSignUpInfoListApi = (
  pageParams: PageParam,
  searchData: Student = {} as Student,
) =>
  $http.post<{ total: number; rows: Student[] }>(
    Api.fuzzyApplyPage,
    {
      ...pageParams,
      ...searchData,
    },
    undefined,
  )

export {
  getSignupInfoByIdApi,
  filterSignupInfoApi,
  getFilteredResultById,
  getSignUpInfoListApi,
}
