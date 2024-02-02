import $http from '@/libs/axios/http'
import { Activity } from '@/types'
enum Api {
  createAct = '/activity/create',
  postedActList = '/activity/getPublishList',
  savedActList = '/activity/geSavedList',
  deleteAct = '/activity/delete',
  updateAct = '/activity/update',
  getActById = '/activity/getDetailMsg',
  getActListwithFuzzyPage = '/activity/fuzzyPage',
}

const createActApi = async (data: Activity) => {
  return await $http({
    method: 'post',
    url: Api.createAct,
    data,
  })
}

const getPostedActListApi = async () => {
  const { result } = await $http<{ total: number; rows: Activity[] }>({
    method: 'get',
    url: Api.postedActList,
  })
  if (result) {
    const { total, rows } = result
    return { total, rows }
  }
  return { total: 0, rows: [] }
}

const getSavedActListApi = async () => {
  const { result } = await $http<{ total: number; rows: Activity[] }>({
    method: 'get',
    url: Api.savedActList,
  })
  return result
}

const deleteActByIdApi = async (id: string) => {
  return await $http({
    method: 'get',
    url: `${Api.deleteAct}?id=${id}`,
  })
}

const updateActApi = async (data: Activity) => {
  const { result } = await $http<Activity>({
    method: 'post',
    url: Api.updateAct,
    data,
  })
  return result
}

const getActByIdApi = async (id: string) => {
  const { result } = await $http<Activity>({
    method: 'get',
    url: `${Api.getActById}?id=${id}`,
  })
  return result
}

// const getActListWithFuzzyPageApi = async (data: Activity & PageParams) => {
//   const { result } = await $http<{ total: number; rows: Activity[] }>({

//   })
// }

export {
  getPostedActListApi,
  getSavedActListApi,
  getActByIdApi,
  createActApi,
  updateActApi,
  deleteActByIdApi,
}
