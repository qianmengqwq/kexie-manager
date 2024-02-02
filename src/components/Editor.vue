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

import { ref, reactive, onMounted } from 'vue'

const model = defineModel()

const tinymceId = ref(
  'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + ''),
)

// const uploadImg = async (blobInfo, progress) =>
//   new Promise((resolve, reject) => {})

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
  // images_upload_handler: uploadImg,
})

//在onMounted中初始化编辑器
onMounted(() => {
  tinymce.init({})
})
</script>

<style scoped></style>
