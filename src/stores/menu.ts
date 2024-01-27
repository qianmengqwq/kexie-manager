import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useMenuStore = defineStore('menu', () => {
  const selectedKeys = ref<string[]>(['1'])
  const isCollapse = ref<boolean>(false)

  return {
    selectedKeys,
    isCollapse,
  }
})
