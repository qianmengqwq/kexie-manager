<script setup lang="ts">
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  UploadOutlined,
} from '@ant-design/icons-vue'
import { onMounted } from 'vue'
import { useLoginStore, useMenuStore, useUserStore } from '@/stores'
import { storeToRefs } from 'pinia'
const { isCollapse } = storeToRefs(useMenuStore())
const { logout } = useLoginStore()
const { uploadAvatar, getPic, getUserInfo } = useUserStore()
const { userInfo, base64Avatar, notifyNum } = storeToRefs(useUserStore())

const handleUpload = (obj: any) => {
  uploadAvatar(obj.file)
}

onMounted(async () => {
  getUserInfo().then(() => {
    getPic()
  })
})
</script>
<template>
  <!-- 需要一个块盒撑起来 -->
  <div class="h-12 bg-white">
    <div class="h-12 flex to-between px-2">
      <!-- left -->
      <div>
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
      </div>
      <!-- right -->
      <div class="flex h-12 items-center">
        <div class="relative h-12 group w-12 mr-2">
          <a-badge :count="notifyNum" class="absolute top-0 left-0">
            <a-avatar
              :src="base64Avatar"
              class="group-hover:hidden w-12 h-12 p-1"
            >
            </a-avatar>
          </a-badge>
          <a-upload
            :showUploadList="false"
            :customRequest="handleUpload"
            name="avatar"
            class="absolute left-4 top-2 hidden group-hover:block"
          >
            <upload-outlined class="trigger text-lg"></upload-outlined>
          </a-upload>
        </div>

        <span class="text-center text-lg"
          >hello，{{ userInfo.username }}！</span
        >
        <LogoutOutlined class="trigger text-lg" @click="logout" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
