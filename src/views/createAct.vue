<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { createActApi } from '@/apis/activity'
import { useCollegeStore, useActivityStore } from '@/stores'
import router from '@/router'
import { storeToRefs } from 'pinia'
import Editor from '@/components/Editor.vue'
import PageHeader from '@/components/PageHeader.vue'
import type { Rule } from 'ant-design-vue/es/form'

const formRef = ref()
const labelCol = { span: 6 }
const wrapperCol = { span: 18 }

const { activityForm, sliderNum } = storeToRefs(useActivityStore())
const { collegeList } = storeToRefs(useCollegeStore())
const { getCollegeList } = useCollegeStore()

const rules: Record<string, Rule[]> = {
  title: [
    {
      required: true,
      message: '请输入活动主题',
      trigger: 'blur',
    },
  ],
  college: [
    {
      required: true,
      message: '请选择举办学院',
      trigger: ['change', 'blur'],
    },
  ],
  signupdeadline: [
    {
      required: true,
      message: '请选择报名截止时间',
      trigger: ['change', 'blur'],
    },
  ],
  holdtime: [
    {
      required: true,
      message: '请选择活动举行时间',
      trigger: ['change', 'blur'],
    },
  ],
  addressonline: [
    {
      required: true,
      message: '请输入线上地址',
      trigger: 'blur',
    },
  ],
  addressoffline: [
    {
      required: true,
      message: '请输入线下地址',
      trigger: 'blur',
    },
  ],
  speaker: [
    {
      required: true,
      message: '请输入主讲人',
      trigger: 'blur',
    },
  ],
  qqgroup: [
    {
      required: true,
      message: '请输入QQ群号',
      trigger: 'blur',
    },
  ],
  totalnumber: [
    {
      required: true,
      message: '请输入总人数',
      trigger: 'blur',
    },
  ],
  totalvipnumber: [
    {
      required: true,
      message: '请输入菁英会员人数',
      trigger: 'blur',
    },
  ],
  totalnotvipnumber: [
    {
      required: true,
      message: '请输入非菁英会员人数',
      trigger: 'blur',
    },
  ],
}

const onSubmit = async (status: number) => {
  formRef.value.validate().then(() => {
    createActApi({ ...activityForm.value, status })
  })
}
const resetForm = () => {
  formRef.value.resetFields()
  activityForm.value.content = ''
}

onMounted(() => {
  getCollegeList()
})
</script>

<template>
  <!-- header -->
  <div class="flex">
    <PageHeader></PageHeader>
    <div class="w-2/3"></div>
    <div class="w-1/3">
      <div class="space-x-2 mb-2">
        <a-button type="primary" @click="onSubmit(0)">保存</a-button>
        <a-button type="primary" @click="onSubmit(1)">发布</a-button>
        <a-button type="primary" @click="resetForm">重置</a-button>
        <a-button
          type="primary"
          @click="
            router.push({
              name: 'preview',
            })
          "
          >预览</a-button
        >
      </div>
    </div>
  </div>

  <div class="flex">
    <div>
      <a-form
        ref="formRef"
        :model="activityForm"
        :rules="rules"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        style="width: 450px"
      >
        <a-form-item label="活动主题" name="title">
          <a-input
            v-model:value="activityForm.title"
            placeholder="请输入活动主题"
            class="w-64"
          />
        </a-form-item>

        <a-form-item label="举办学院" name="college">
          <a-select
            v-model:value="activityForm.college"
            placeholder="请选择举办学院"
            style="width: 256px"
          >
            <a-select-option
              v-for="item in collegeList"
              :key="item.sid"
              :value="item.college"
            >
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="报名截止时间" required name="signupdeadline">
          <a-date-picker
            v-model:value="activityForm.signupdeadline"
            show-time
            type="date"
            placeholder="请选择报名截止时间"
            class="w-64"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </a-form-item>
        <a-form-item label="活动举行时间" required name="holdtime">
          <a-date-picker
            v-model:value="activityForm.holdtime"
            show-time
            type="date"
            placeholder="请选择活动举行时间"
            class="w-64"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </a-form-item>
        <a-form-item label="线上地址" name="addressonline">
          <a-input
            v-model:value="activityForm.addressonline"
            placeholder="请输入线上地址"
            class="w-64"
          />
        </a-form-item>
        <a-form-item label="线下地址" name="addressoffline">
          <a-input
            v-model:value="activityForm.addressoffline"
            placeholder="请输入线下地址"
            class="w-64"
          />
        </a-form-item>
        <a-form-item label="主讲人" name="speaker">
          <a-input
            v-model:value="activityForm.speaker"
            class="w-64"
            placeholder="请输入主讲人"
          />
        </a-form-item>
        <a-form-item label="QQ群" name="qqgroup">
          <a-input
            v-model:value="activityForm.qqgroup"
            class="w-64"
            placeholder="请输入QQ群号"
          />
        </a-form-item>
        <hr />

        <div class="flex mt-3">
          <div class="flex justify-end items-center" style="width: 113px">
            <span class="px-2">活动总人数:&nbsp;</span>
          </div>
          <div>
            <a-slider
              v-model:value="sliderNum"
              :marks="{
                0: '0',
                20: '20',
                40: '40',
                60: '60',
                80: '80',
                100: '100',
              }"
              style="width: 243px"
            />
            <a-form-item name="totalnumber">
              <a-input
                v-model:value="activityForm.totalnumber"
                placeholder="活动总人数"
                class="w-64"
                type="number"
              />
            </a-form-item>
          </div>
        </div>

        <a-form-item label="菁英会员人数" name="totalnumber">
          <a-input
            v-model:value="activityForm.totalvipnumber"
            placeholder="请输入菁英会员人数"
            class="w-64"
            type="number"
          />
        </a-form-item>

        <a-form-item label="非菁英会员人数" name="totalnumber">
          <a-input
            v-model:value="activityForm.totalnotvipnumber"
            placeholder="请输入非菁英会员人数"
            class="w-64"
            type="number"
          />
        </a-form-item>
      </a-form>
    </div>
    <div>
      <header class="mb-3">活动内容:</header>
      <Editor v-model="activityForm.content"></Editor>
    </div>
  </div>
</template>

<style scoped></style>
