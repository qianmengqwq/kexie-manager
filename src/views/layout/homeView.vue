<template>
  <a-layout class="min-h-screen">
    <sidebar></sidebar>
    <a-layout>
      <topbar></topbar>
      <a-layout-content class="content mx-4 my-6 p-6 bg-white min-h-72">
        <RouterView></RouterView>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import sidebar from './components/sidebar.vue'
import topbar from './components/topbar.vue'
import { useUserStore } from '@/stores'
import { onMounted } from 'vue'
const { getUserInfo } = useUserStore()
onMounted(() => {
  getUserInfo()
})
</script>
