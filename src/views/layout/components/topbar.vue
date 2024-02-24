<script setup lang="ts">
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  UploadOutlined,
  UserAddOutlined,
} from '@ant-design/icons-vue'
import { ref } from 'vue'
import { useLoginStore, useMenuStore, useUserStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { getPowerApi } from '@/apis/login'
import { registerApi } from '@/apis/user'
import Cookies from 'js-cookie'
import { User } from '@/types'

const { isCollapse } = storeToRefs(useMenuStore())
const { logout } = useLoginStore()
const { uploadAvatar } = useUserStore()
const { userInfo, notifyNum, hasVerifiedTwice } = storeToRefs(useUserStore())

const handleUpload = (obj: any) => {
  uploadAvatar(obj.file)
}

const isShowRegist = ref(false)
const isShowVerify = ref(false)
const verifyPwd = ref('')

const handleRegist = () => {
  hasVerifiedTwice.value
    ? (isShowRegist.value = true)
    : (isShowVerify.value = true)
}

const registerForm = ref<Omit<User, 'id'>>({
  username: '',
  password: '',
  email: '',
  level: undefined,
  pic: '',
})
const handleRegistSubmit = async () => {
  const [e, r] = await registerApi(registerForm.value)
  isShowRegist.value = false
  if (!r && e) {
    Cookies.remove('verifiedTwice')
  }
}

const handleVerifySubmit = async () => {
  const [e, r] = await getPowerApi(verifyPwd.value)
  if (!e && r) {
    isShowVerify.value = false
    hasVerifiedTwice.value = true
  }
}
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
              :src="userInfo.pic"
              alt="暂无头像"
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
        <UserAddOutlined class="trigger text-lg mr-2" @click="handleRegist" />
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
      <a-form
        :model="registerForm"
        :labelCol="{ span: 6 }"
        :wrapperCol="{ span: 18 }"
        style="width: 450px"
      >
        <a-form-item name="username" label="用户名">
          <a-input
            placeholder="请输入用户名"
            v-model:value="registerForm.username"
            class="w-64"
          />
        </a-form-item>
        <a-form-item name="password" label="密码">
          <a-input-password
            placeholder="请输入密码"
            v-model:value="registerForm.password"
            class="w-64"
          />
        </a-form-item>
        <a-form-item name="email" label="邮箱">
          <a-input
            placeholder="请输入邮箱"
            v-model:value="registerForm.email"
            class="w-64"
          />
        </a-form-item>
        <a-form-item label="权限" name="level">
          <a-input-number
            placeholder="请输入权限等级"
            v-model:value="registerForm.level"
            class="w-64"
            :min="0"
          />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      v-model:open="isShowVerify"
      title="验证你的身份"
      @ok="handleVerifySubmit"
      aria-placeholder="请再次输入您的密码"
      centered
    >
      <a-input v-model:value="verifyPwd" />
    </a-modal>
  </dialog>
</template>

<style scoped></style>
