<script setup lang="ts">
import { useActivityStore } from '@/stores'
import PageHeader from '@/components/PageHeader.vue'
import { storeToRefs } from 'pinia'
const { activityForm } = storeToRefs(useActivityStore())
</script>
<template>
  <PageHeader></PageHeader>

  <div v-html="activityForm.content"></div>
</template>

<style scoped></style>
