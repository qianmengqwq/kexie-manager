<script setup lang="ts">
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  UploadOutlined,
  UserAddOutlined,
} from '@ant-design/icons-vue'
import { onMounted, ref } from 'vue'
import { useLoginStore, useMenuStore, useUserStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { getPowerApi } from '@/apis/login'
import { registerApi } from '@/apis/user'
import {} from '@/enums'
import { User } from '@/types'

const { isCollapse } = storeToRefs(useMenuStore())
const { logout } = useLoginStore()
const { uploadAvatar, getPic, getUserInfo } = useUserStore()
const { userInfo, base64Avatar, notifyNum } = storeToRefs(useUserStore())

const handleUpload = (obj: any) => {
  uploadAvatar(obj.file)
}

const hasVerifyTwice = ref(false)
const isShowRegist = ref(false)
const regist = async () => {
  if (!hasVerifyTwice.value) {
    const [e, r] = await getPowerApi()
    if (!e && r) {
      hasVerifyTwice.value = true
    }
  }
}
const registerForm = ref<User>({
  username: '',
  password: '',
  email: '',
  level: 0,
  pic: '',
})
const handleRegistSubmit = async () => {
  const [e, r] = await registerApi(registerForm.value)
  if (!e && r) {
    isShowRegist.value = false
  }
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
          >hello，{{ userInfo.username || '管理员' }}！</span
        >
        <UserAddOutlined class="trigger text-lg ml-2" @click="regist" />
        <LogoutOutlined class="trigger text-lg mr-2" @click="logout" />
      </div>
    </div>
  </div>
  <dialog>
    <a-modal
      v-model:open="isShowRegist"
      title="注册"
      @ok="handleRegistSubmit"
      centered
    >
    </a-modal>
  </dialog>
</template>

<style scoped></style>
