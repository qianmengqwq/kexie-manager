import service from '@/libs/axios/http'
import type { College, Major, KexieResponse } from '@/types'
enum Api {
  getCollegeList = '/college/getCollegeList',
  getMajorList = '/college/getMajor',
}

const getCollegeListApi = () =>
  service.get<KexieResponse<College[]>>(Api.getCollegeList)

const getMajorListByIdApi = () =>
  service.get<KexieResponse<Major[]>>(Api.getMajorList)

export { getCollegeListApi, getMajorListByIdApi }
