import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCollegeListApi } from '@/apis/college'
import type { College } from '@/types'
export const useCollegeStore = defineStore('college', () => {
  const collegeList = ref<College[]>([])

  const getCollegeList = async () => {
    const result = await getCollegeListApi()
    if (result) collegeList.value = result
  }
  return {
    collegeList,
    getCollegeList,
  }
})
