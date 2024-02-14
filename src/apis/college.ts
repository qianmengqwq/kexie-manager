import { $http } from '@/libs/axios/http'
import type { College, Major } from '@/types'
enum Api {
  getCollegeList = '/college/getCollegeList',
  getMajorList = '/college/getMajor',
}

const getCollegeListApi = () => $http.get<College[]>(Api.getCollegeList)

const getMajorListByIdApi = () => $http.get<Major[]>(Api.getMajorList)

export { getCollegeListApi, getMajorListByIdApi }
