import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCollegeListApi } from '@/apis/college'
import type { College } from '@/types'
export const useCollegeStore = defineStore('college', () => {
  const collegeList = ref<College[]>([])

  const getCollegeList = async () => {
    const [e, r] = await getCollegeListApi()
    if (!e && r) {
      const { result } = r
      collegeList.value = result
    }
  }
  return {
    collegeList,
    getCollegeList,
  }
})
