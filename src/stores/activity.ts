import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Activity } from '@/types'

export const useActivityStore = defineStore('activity', () => {
  const activityForm = ref<Activity>({
    title: '',
    // 这里要设置为undefined才可以让select框里的placeholder显示
    college: undefined,
    signupdeadline: '',
    holdtime: '',
    addressonline: '',
    addressoffline: '',
    speaker: '',
    qqgroup: '',
    totalnumber: 0,
    totalvipnumber: 0,
    totalnotvipnumber: 0,
    content: '',
  })

  const activeActId = ref<number>(0)

  // 超出限制的值，input框里可以接收
  const sliderNum = computed({
    get() {
      if (
        activityForm.value.totalnumber &&
        activityForm.value.totalnumber > 100
      ) {
        return 100
      }
      return activityForm.value.totalnumber
    },
    set(value) {
      activityForm.value.totalnumber = value
    },
  })

  return {
    activityForm,
    sliderNum,
    activeActId,
  }
})
