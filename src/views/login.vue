<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import axios from 'axios'
import router from '@/router'
import { loginApi } from '@/apis/login'
import { useUserStore, useLoginStore } from '@/stores'
import { useRequest } from 'vue-request'
import { loginTypeEnum } from '@/enums'
import type { LoginRequestData } from '@/types'

// 账密登录
const { userId } = storeToRefs(useUserStore())
const { codeBase64 } = storeToRefs(useLoginStore())
const { getCode } = useLoginStore()
const loginForm = reactive<LoginRequestData>({
  username: '',
  password: '',
  status: 0,
  code: '',
})

const isRemberMe = computed({
  get() {
    return loginForm.status === 1
  },
  set(value) {
    loginForm.status = value ? 1 : 0
  },
})

const loginFormRef = ref()
const handleLogin = async () => {
  loginFormRef.value.validate().then(async () => {
    const { data, error } = useRequest(loginApi)
  })
  //不再捕获错误，拿到错误消息没有意义，只做拦截
}

const { loginType } = storeToRefs(useLoginStore())

onMounted(() => {
  getCode()
})
</script>

<template>
  <div class="base-container flex h-full">
    <div class="flex w-1/2"></div>
    <div class="flex w-1/2">
      <div class="to-mid flex-1 flex-col">
        <div class="text-2xl font-bold mb-2">
          {{ loginType === loginTypeEnum.PASSWORD ? '登录' : '邮箱验证' }}
        </div>
        <a-form
          v-show="loginType === loginTypeEnum.PASSWORD"
          ref="loginFormRef"
          :model="loginForm"
          name="basic"
          autocomplete="on"
          @keypress.enter="handleLogin"
        >
          <a-form-item
            name="username"
            :rules="[{ required: true, message: '请输入用户名！' }]"
          >
            <a-input
              v-model:value="loginForm.username"
              placeholder="用户名"
              class="min-w-80 h-9"
            />
          </a-form-item>

          <a-form-item
            name="password"
            :rules="[{ required: true, message: '请输入密码！' }]"
          >
            <a-input-password
              v-model:value="loginForm.password"
              placeholder="密码"
              class="min-w-80 h-9"
            />
          </a-form-item>

          <a-form-item name="code">
            <a-input
              v-model:value="loginForm.code"
              placeholder="验证码"
              class="min-w-80 h-9"
            />
            <div
              v-show="codeBase64"
              @click="useLoginStore().getCode()"
              class="cursor-pointer absolute top-0 right-1 flex justify-center items-center h-9 w-24"
            >
              <img :src="codeBase64" alt="" class="h-8" />
            </div>
          </a-form-item>

          <a-form-item name="status">
            <div class="to-between min-w-80">
              <a-checkbox v-model:checked="isRemberMe">记住我</a-checkbox>
              <span
                @click="loginType = loginTypeEnum.EMAIL"
                class="text-sky-400 cursor-pointer"
              >
                邮箱登录
              </span>
            </div>
          </a-form-item>

          <a-form-item>
            <div class="min-w-80 to-mid">
              <a-button type="primary" @click="handleLogin" shape="round" block
                >登录</a-button
              >
            </div>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 偷的vben的svg图背景实现 */
/* 网上想找一些其他的条纹图案没找好，就暂时先用着吧 */
.base-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin-left: -48%;
  background-image: url('@/assets/login-bg.svg');
  background-repeat: no-repeat;
  background-position: 100%;
  background-size: auto 100%;
}
</style>
