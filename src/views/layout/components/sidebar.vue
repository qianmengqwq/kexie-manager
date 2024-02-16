<script setup lang="ts">
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons-vue'

import { useMenuStore } from '@/stores'
import { storeToRefs } from 'pinia'
const { isCollapse, selectedKeys } = storeToRefs(useMenuStore())

interface MenuItem {
  name: string
  route: string
  key: string
  icon: any
}
const asideItemMap: MenuItem[] = [
  { name: '创建新的活动', route: '/create', key: '1', icon: UserOutlined },
  {
    name: '已保存的活动',
    route: '/saved',
    key: '2',
    icon: VideoCameraOutlined,
  },
  { name: '已发布的活动', route: '/posted', key: '3', icon: UploadOutlined },
  {
    name: '报名信息审核',
    route: '/infoExtraction',
    key: '4',
    icon: UploadOutlined,
  },
]
</script>
<template>
  <a-layout-sider
    v-model:collapsed="isCollapse"
    :trigger="null"
    collapsible
    theme="light"
  >
    <div class="logo flex">
      <div>
        <img src="@/assets/wuster.png" alt="wuster" class="w-16 h-16" />
      </div>
      <div
        class="text-3xl flex flex-1 items-center justify-center text-center"
        v-show="!isCollapse"
      >
        Wuster
      </div>
    </div>
    <a-menu v-model:selectedKeys="selectedKeys" theme="light" mode="inline">
      <a-menu-item v-for="item in asideItemMap" :key="item.key">
        <component :is="item.icon" />
        <span
          ><router-link :to="item.route">{{ item.name }}</router-link></span
        >
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>
<style scoped></style>
