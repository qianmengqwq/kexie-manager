<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import router from '@/router'
import { loginApi } from '@/apis/login'
import { useUserStore } from '@/stores'
import type { LoginRequestData } from '@/types'

// 账密登录
const { userId } = storeToRefs(useUserStore())

const loginForm = reactive<LoginRequestData>({
  username: 'huhu',
  password: '1282',
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
    const res = await loginApi(loginForm)
    if (res) {
      userId.value = res.uid
      router.push({ path: '/' })
    }
  })
  //不再捕获错误，拿到错误消息没有意义，只做拦截
}
</script>

<template>
  <div class="container flex h-full">
    <div class="flex w-1/2">qwq</div>
    <div class="flex w-1/2">
      <a-form
        ref="loginFormRef"
        :model="loginForm"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        :autocomplete="isRemberMe ? 'on' : 'off'"
      >
        <a-form-item
          label="用户名"
          name="username"
          :rules="[{ required: true, message: '请输入用户名！' }]"
        >
          <a-input v-model:value="loginForm.username" />
        </a-form-item>

        <a-form-item
          label="密码"
          name="password"
          :rules="[{ required: true, message: '请输入密码！' }]"
        >
          <a-input-password v-model:value="loginForm.password" />
        </a-form-item>

        <a-form-item label="验证码" name="code">
          <a-input v-model:value="loginForm.code" />
        </a-form-item>

        <a-form-item name="status" :wrapper-col="{ offset: 8, span: 16 }">
          <a-checkbox v-model:checked="isRemberMe">记住我</a-checkbox>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" @click="handleLogin">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style scoped>
/* 偷的vben的svg图背景实现 */
/* 网上想找一些其他的条纹图案没找好，就暂时先用着吧 */
.container::before {
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
  opacity: 0.7;
}
</style>
