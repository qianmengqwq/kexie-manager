<script setup lang="ts">
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { useMenuStore } from '@/stores'
import { storeToRefs } from 'pinia'
const { isCollapse } = storeToRefs(useMenuStore())
</script>
<template>
  <a-layout-header style="background: #fff; padding: 0">
    <menu-unfold-outlined
      v-if="isCollapse"
      class="trigger"
      @click="() => (isCollapse = !isCollapse)"
    />
    <menu-fold-outlined
      v-else
      class="trigger"
      @click="() => (isCollapse = !isCollapse)"
    />
  </a-layout-header>
</template>

<style scoped></style>
