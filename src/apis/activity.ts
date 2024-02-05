import service from '@/libs/axios/http'
import { Activity, KexieResponse } from '@/types'
enum Api {
  createAct = '/activity/create',
  postedActList = '/activity/getPublishList',
  savedActList = '/activity/geSavedList',
  deleteAct = '/activity/delete',
  updateAct = '/activity/update',
  getActById = '/activity/getDetailMsg',
  getActListwithFuzzyPage = '/activity/fuzzyPage',
}

const createActApi = (data: Activity) =>
  service.post<KexieResponse<null>>(Api.createAct, data)

const getPostedActListApi = () =>
  service.get<KexieResponse<{ total: number; rows: Activity[] }>>(
    Api.postedActList,
  )

const getSavedActListApi = () =>
  service.get<KexieResponse<{ total: number; rows: Activity[] }>>(
    Api.savedActList,
  )

const deleteActByIdApi = (id: string) =>
  service.get<KexieResponse<Activity>>(`Api.deleteAct?id=${id}`)

const updateActApi = (data: Activity) =>
  service.post<KexieResponse<Activity>>(Api.updateAct, data)

const getActByIdApi = (id: string) =>
  service.get<Activity>(`Api.getActById?id=${id}`)

export {
  getPostedActListApi,
  getSavedActListApi,
  getActByIdApi,
  createActApi,
  updateActApi,
  deleteActByIdApi,
}
