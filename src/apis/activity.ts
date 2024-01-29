import $http from '@/libs/axios/http'
import { Activity } from '@/types'
enum Api {
  createAct = '/activity/create',
  postedActList = '/activity/getPublishList',
  savedActList = '/activity/getSavedList',
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
  if (result) {
    const { total, rows } = result
    return { total, rows }
  }
  return { total: 0, rows: [] }
}

export { createActApi, getPostedActListApi, getSavedActListApi }
