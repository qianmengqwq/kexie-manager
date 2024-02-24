<template>
  <PageHeader></PageHeader>
  <div class="flex">
    <div class="w-32"></div>
    <actForm></actForm>
  </div>
  <div>
    <div class="flex justify-end items-center w-full pr-12">
      <a-button type="primary" @click="updateActApi(activityForm)"
        >修改</a-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import { getActByIdApi } from '@/apis/activity'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useActivityStore } from '@/stores'
import actForm from './actForm.vue'
import { storeToRefs } from 'pinia'
import { updateActApi } from '@/apis/activity'

const route = useRoute()
const activityid = Number(route.params.activityid)
const { activityForm, status } = storeToRefs(useActivityStore())

const getActInfo = async () => {
  const [e, r] = await getActByIdApi(activityid)
  if (!e && r) {
    activityForm.value = r.result
    console.log(r.result)
  }
}

status.value = 'update'
onMounted(() => {
  getActInfo()
})
</script>

<style scoped></style>
