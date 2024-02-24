import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Activity } from '@/types'

export const useActivityStore = defineStore('activity', () => {
  // 这里要设置为undefined才可以让内容的placeholder显示
  const activityForm = ref<Activity>({
    title: '',
    college: undefined,
    signupdeadline: '',
    holdtime: '',
    addressonline: '',
    addressoffline: '',
    speaker: '',
    qqgroup: '',
    totalnumber: undefined,
    totalvipnumber: undefined,
    totalnotvipnumber: undefined,
    content: '',
  })

  const activeActId = ref<number>(0)
  const status = ref<'create' | 'update'>()

  const $reset = () => {
    activityForm.value = {
      title: '',
      college: undefined,
      signupdeadline: '',
      holdtime: '',
      addressonline: '',
      addressoffline: '',
      speaker: '',
      qqgroup: '',
      totalnumber: undefined,
      totalvipnumber: undefined,
      totalnotvipnumber: undefined,
      content: '',
    }
  }

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
    status,
    activeActId,
    activityForm,
    sliderNum,
    $reset,
  }
})
