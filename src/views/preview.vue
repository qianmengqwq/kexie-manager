<script setup lang="ts">
import { useActivityStore } from '@/stores'
import { storeToRefs } from 'pinia'
const { activityForm } = storeToRefs(useActivityStore())
</script>
<template>
  <div v-html="activityForm.content"></div>
</template>

<style scoped></style>
