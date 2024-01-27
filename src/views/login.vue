<script setup lang="ts"></script>

<template>
  <div class="container flex h-full">
    <div class="flex w-1/2">qwq</div>
    <div class="flex w-1/2">qwq2</div>
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
