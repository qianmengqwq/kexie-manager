<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import router from '@/router'
import { loginApi } from '@/apis/login'
import { useUserStore, useLoginStore } from '@/stores'
import { useStorage } from '@/hooks/useStorage'
import { useToken } from '@/hooks/useToken'
import type { LoginRequestData } from '@/types'

const { setStorage } = useStorage()
const { setStorage: setSessionStorage } = useStorage('sessionStorage')
// base64验证码
const { codeBase64 } = storeToRefs(useLoginStore())
const { getCode } = useLoginStore()

const loginForm = reactive<LoginRequestData>({
  username: '',
  password: '',
  code: '',
})

const isRemberMe = ref<boolean>(false)
const { getUserInfo } = useUserStore()
const { userInfo } = storeToRefs(useUserStore())
const { removeToken } = useToken()
const loginFormRef = ref()
const handleLogin = async () => {
  loginFormRef.value.validate().then(async () => {
    const [e, r] = await loginApi(loginForm)
    if (!e && r) {
      const uid = r.result.uid
      getUserInfo(uid).then(() => {
        if (isRemberMe.value) {
          setStorage('userInfo', userInfo.value)
        } else {
          setSessionStorage('userInfo', userInfo.value)
          window.onbeforeunload = () => {
            removeToken()
          }
        }
      })
      router.push('/create')
    }
  })
}

onMounted(() => {
  getCode()
})
</script>

<template>
  <div class="base-container flex h-full">
    <div class="flex w-1/2"></div>
    <div class="flex w-1/2">
      <div class="to-mid flex-1 flex-col">
        <div class="text-2xl font-bold mb-2">登录</div>
        <a-form
          ref="loginFormRef"
          :model="loginForm"
          name="basic"
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
              autocomplete="off"
            />
            <div
              v-show="codeBase64"
              @click="getCode"
              class="cursor-pointer absolute top-0 right-1 flex justify-center items-center h-9 w-24"
            >
              <img :src="codeBase64" alt="" class="h-8" />
            </div>
          </a-form-item>

          <a-form-item name="status">
            <div class="to-between min-w-80">
              <a-checkbox v-model:checked="isRemberMe">记住我</a-checkbox>
              <!-- <span
                @click="loginType = loginTypeEnum.EMAIL"
                class="text-sky-400 cursor-pointer"
              >
                邮箱登录
              </span> -->
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
