<script setup lang="ts">
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  UploadOutlined,
} from '@ant-design/icons-vue'
import { useLoginStore, useMenuStore, useUserStore } from '@/stores'
import { storeToRefs } from 'pinia'
const { isCollapse } = storeToRefs(useMenuStore())
const { notifyNum, picUrl } = storeToRefs(useUserStore())
const { logout } = useLoginStore()
</script>
<template>
  <!-- 写行内，taliwind优先级不够 -->
  <a-layout-header style="background: #fff; padding: 0">
    <menu-unfold-outlined
      v-if="isCollapse"
      class="trigger text-lg"
      @click="() => (isCollapse = !isCollapse)"
    />
    <menu-fold-outlined
      v-else
      class="trigger text-lg"
      @click="() => (isCollapse = !isCollapse)"
    />
    <LogoutOutlined class="trigger text-lg" @click="logout" />
    <div class="relative">
      <a-badge :count="notifyNum" class="absolute top-0 left-0">
        <a-avatar :src="picUrl"> </a-avatar>
      </a-badge>
      <upload-outlined class="trigger absolute top-2 left-2" />
    </div>
  </a-layout-header>
</template>

<style scoped></style>
