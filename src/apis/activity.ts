import { $http } from '@/libs/axios/http'
import { Activity } from '@/types'
enum Api {
  createAct = '/activity/create',
  postedActList = '/activity/getPublishList',
  savedActList = '/activity/geSavedList',
  deleteAct = '/activity/delete',
  updateAct = '/activity/update',
  getActById = '/activity/getDetailMsg',
  getActListwithFuzzyPage = '/activity/fuzzyPage',
  uploadActPic = '/upload',
}

const createActApi = (data: Activity) => $http.post<number>(Api.createAct, data)

const getPostedActListApi = () =>
  $http.get<{ total: number; rows: Activity[] }>(Api.postedActList, undefined, {
    IsShowErrorMsg: true,
  })

const getSavedActListApi = () =>
  $http.get<{ total: number; rows: Activity[] }>(Api.savedActList, undefined, {
    IsShowErrorMsg: true,
  })

const deleteActByIdApi = (id: string) =>
  $http.get<Activity>(`${Api.deleteAct}?id=${id}`, undefined, {
    IsShowErrorMsg: true,
    IsShowSuccessMsg: true,
  })

const updateActApi = (data: Activity) =>
  $http.post<Activity>(Api.updateAct, data, undefined, {
    IsShowErrorMsg: true,
    IsShowSuccessMsg: true,
  })

const getActByIdApi = (id: number) =>
  $http.get<Activity>(`${Api.getActById}?id=${id}`)

const uploadActPicApi = (data: FormData) =>
  $http.post<string>(Api.uploadActPic, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

export {
  getPostedActListApi,
  getSavedActListApi,
  getActByIdApi,
  createActApi,
  updateActApi,
  deleteActByIdApi,
  uploadActPicApi,
}
