<script setup lang="ts">
import { useActivityStore } from '@/stores'
import PageHeader from '@/components/PageHeader.vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const { activityForm } = storeToRefs(useActivityStore())
const type = ref<'phone' | 'flat' | 'pc'>('pc')
</script>
<template>
  <div class="w-full h-full">
    <div class="flex">
      <PageHeader></PageHeader>
      <div class="flex justify-end items-center space-x-2 mb-2 w-full mr-12">
        <a-button @click="type = 'phone'" type="primary">手机</a-button>
        <a-button @click="type = 'flat'" type="primary">平板</a-button>
        <a-button @click="type = 'pc'" type="primary">电脑</a-button>
      </div>
    </div>

    <div class="to-mid bg-gray-200 p-10">
      <a-card class="border border-grey-400">
        <div :class="type" v-html="activityForm.content"></div>
      </a-card>
    </div>
  </div>
</template>

<style scoped>
.phone {
  width: 430px;
  height: 820px;
}

.flat {
  width: 1180px;
  height: 820px;
}

.pc {
  width: full;
  height: full;
}
</style>
