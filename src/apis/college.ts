import $http from '@/libs/axios/http'
import type { College, Major } from '@/types'
enum Api {
  getCollegeList = '/college/getCollegeList',
  getMajorList = '/college/getMajor',
}

const getCollegeListApi = async () => {
  const { result } = await $http<College[]>({
    method: 'get',
    url: Api.getCollegeList,
  })
  return result
}

const getMajorListByIdApi = async (sid: string) => {
  const { result } = await $http<Major[]>({
    method: 'get',
    url: `${Api.getMajorList}?sid=${sid}`,
  })
  return result
}

export { getCollegeListApi, getMajorListByIdApi }
