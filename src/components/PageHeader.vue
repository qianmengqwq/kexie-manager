<script setup lang="ts">
import { useMetaTitle } from '@/hooks/useMetaTitle'
import router from '@/router'

const title = useMetaTitle()
</script>

<template>
  <a-page-header :title="title" @back="router.back()" />
</template>

<style scoped></style>
