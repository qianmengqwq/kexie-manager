<template>
  <a-layout class="min-h-screen">
    <sidebar></sidebar>
    <a-layout>
      <topbar></topbar>
      <a-layout-content class="content">
        <RouterView></RouterView>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import sidebar from './components/sidebar.vue'
import topbar from './components/topbar.vue'
</script>
<style>
.content {
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
  min-height: 280px;
}
</style>
