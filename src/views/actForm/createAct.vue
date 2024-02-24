<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { createActApi } from '@/apis/activity'
import { useCollegeStore, useActivityStore } from '@/stores'
import { storeToRefs } from 'pinia'
import actForm from './actForm.vue'
import router from '@/router'
import PageHeader from '@/components/PageHeader.vue'
import { ActivityStatusEnum } from '@/enums'

const { activityForm, status } = storeToRefs(useActivityStore())
const { getCollegeList } = useCollegeStore()
const child = ref()

const onSubmit = async (status: number) => {
  child.value.formRef.validate().then(() => {
    createActApi({ ...activityForm.value, status })
  })
}
const resetForm = () => {
  child.value.formRef.resetFields()
  activityForm.value.content = ''
}

status.value = 'create'
onMounted(() => {
  getCollegeList()
})
</script>

<template>
  <!-- header -->
  <div class="flex">
    <PageHeader></PageHeader>
    <div class="w-2/3"></div>
    <div class="w-1/3">
      <div class="space-x-2 mb-2">
        <a-button type="primary" @click="onSubmit(ActivityStatusEnum.SAVED)"
          >保存</a-button
        >
        <a-button type="primary" @click="onSubmit(ActivityStatusEnum.POSTED)"
          >发布</a-button
        >
        <a-button type="primary" @click="resetForm">重置</a-button>
        <a-button
          type="primary"
          @click="
            router.push({
              name: 'preview',
            })
          "
          >预览</a-button
        >
      </div>
    </div>
  </div>

  <!-- form -->
  <actForm ref="child"></actForm>
</template>

<style scoped></style>
