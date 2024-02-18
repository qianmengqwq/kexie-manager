<template>
  <PageHeader></PageHeader>
  <div class="flex">
    <div></div>
    <div>
      <div v-html="activity?.content"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import { getActByIdApi } from '@/apis/activity'
import { onMounted, ref } from 'vue'
import { Activity } from '@/types'
import { useRoute } from 'vue-router'

const route = useRoute()

const activityid = Number(route.params.activityid)

const activity = ref<Activity>()

const getActInfo = async () => {
  const [e, r] = await getActByIdApi(activityid)
  if (!e && r) {
    const { result } = r
    activity.value = result
  }
}

onMounted(() => {
  getActInfo()
})
</script>

<style scoped></style>
