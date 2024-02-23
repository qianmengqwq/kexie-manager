<template>
  <PageHeader></PageHeader>
  <div class="flex">
    <div></div>
    <div>
      <div v-html="activity?.content"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import { getActByIdApi } from '@/apis/activity'
import { onMounted, ref } from 'vue'
import { Activity } from '@/types'
import { useRoute } from 'vue-router'
import { getPicApi } from '@/apis/user'
import { useFileConversion } from '@/hooks/useFileConversion'

const [fileToBase64] = useFileConversion()

const route = useRoute()

const activityid = Number(route.params.activityid)

const activity = ref<Activity>()

const getActInfo = async () => {
  const [e, r] = await getActByIdApi(activityid)
  if (!e && r) {
    const { result } = r
    activity.value = result
    activity.value.content = await parseImg(result.content)
  }
}

const parseImg = async (htmlStr: string | undefined) => {
  if (!htmlStr) return
  let outputStr = htmlStr
  const imgRegex = /<img.*?src=["'](.*?)["']/g
  let match
  // 使用正则表达式进行匹配，并提取 src 属性值
  while ((match = imgRegex.exec(htmlStr)) !== null) {
    const src = match[1]
    try {
      const res = await getPicApi(src)
      //将匹配到的src字段改为对应的base64数据
      const base64src = await fileToBase64(res.data, '')
      outputStr = outputStr.replace(match[0], `<img src="${base64src}"`)
    } catch (e) {
      console.error(e)
    }
  }
  return outputStr
}

onMounted(() => {
  getActInfo()
})
</script>

<style scoped></style>
