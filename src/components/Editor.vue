<template>
  <div>
    <editor v-model="model" :init="init" :id="tinymceId"></editor>
  </div>
</template>

<script lang="ts" setup>
import tinymce from 'tinymce/tinymce' // tinymce默认hidden，不引入不显示
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver/theme' // 主题文件
import 'tinymce/icons/default'
import 'tinymce/models/dom'
import 'tinymce/plugins/code' // 查看源码
import 'tinymce/plugins/link'
import 'tinymce/plugins/table' // 插入表格插件
import 'tinymce/plugins/lists' // 列表插件
import 'tinymce/plugins/image' // 插入上传图片插件
import 'tinymce/plugins/wordcount' // 字数统计插件

import { ref, reactive, onMounted, watch } from 'vue'
import { ActivityStatusEnum } from '@/enums'
import { createActApi, updateActApi, uploadActPicApi } from '@/apis/activity'
import { debounce } from 'lodash-es'
import { useActivityStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { Activity } from '@/types'

const { activityForm, activeActId } = storeToRefs(useActivityStore())
const state = ref(false)
const model = defineModel()

const checkFormEmpty = (activityForm: Activity) => {
  for (const key in activityForm) {
    if (!activityForm[key as keyof Activity]) {
      return true
    }
  }
  return false
}
const saveContent = async () => {
  if (checkFormEmpty(activityForm.value)) return
  if (state.value) {
    updateActApi({
      ...activityForm.value,
      status: ActivityStatusEnum.SAVED,
      activityid: activeActId.value,
    })
  } else {
    const [e, r] = await createActApi({
      ...activityForm.value,
      status: ActivityStatusEnum.SAVED,
    })
    if (!e && r) {
      const { result } = r
      activeActId.value = result
    }
    state.value = true
  }
}
const deboncedSave = debounce(saveContent, 1000)

watch(model, () => {
  deboncedSave()
})

const tinymceId = ref(
  'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + ''),
)

const uploadImg = async (blobInfo: any) => {
  const formData = new FormData()
  formData.append('file', blobInfo.blob())
  formData.append('aid', activeActId.value.toString())
  const [e, r] = await uploadActPicApi(formData)
  if (!e && r) {
    const url = r.result
    const reqUrl = '/getPic' + url.replace('https://kexie.cos.wuster.world', '')
    return reqUrl
  }
}

// 初始化
const init = reactive({
  height: 400,
  width: 1000,
  language_url: '/tinymce/langs/zh-Hans.js', // 语言包的路径，具体路径看自己的项目，文档后面附上中文js文件
  language: 'zh-Hans', //语言
  skin_url: '/tinymce/skins/ui/oxide', // skin路径，具体路径看自己的项目
  plugins: 'link lists image code table wordcount',
  toolbar:
    'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
  branding: false, // 去掉编辑器右下角的广告
  menubar: false,
  paste_webkit_styles: 'all',
  paste_merge_formats: true,
  paste_data_images: false, // 不允许粘贴图片
  images_upload_credentials: true, //允许携带cookie
  images_upload_handler: uploadImg,
})

//在onMounted中初始化编辑器
onMounted(() => {
  tinymce.init({})
})
</script>

<style scoped></style>
