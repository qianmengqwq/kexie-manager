<script lang="ts" setup>
import { reactive, ref, toRaw, computed, onMounted } from 'vue'
import { createActApi } from '@/apis/activity'
import { useCollegeStore } from '@/stores'
import type { UnwrapRef } from 'vue'
import type { Rule } from 'ant-design-vue/es/form'
import { storeToRefs } from 'pinia'
import Editor from '@/components/Editor.vue'
interface FormState {
  title: string
  college: string
  signupdeadline: string
  holdtime: string
  addressonline: string
  addressoffline: string
  speaker: string
  qqgroup: string
  totalnumber: number
  totalvipnumber: number
  totalnotvipnumber: number
  content?: string
}

const formRef = ref()
const labelCol = { span: 6 }
const wrapperCol = { span: 18 }
const formState: UnwrapRef<FormState> = reactive({
  title: '',
  college: '',
  signupdeadline: '',
  holdtime: '',
  addressonline: '',
  addressoffline: '',
  speaker: '',
  qqgroup: '',
  totalnumber: 0,
  totalvipnumber: 0,
  totalnotvipnumber: 0,
  content: '',
})

// 超出限制的值，input框里可以接收
const sliderNum = computed({
  get() {
    if (formState.totalnumber > 100) {
      return 100
    }
    return formState.totalnumber
  },
  set(value) {
    formState.totalnumber = value
  },
})

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
    console.log('values', formState, toRaw(formState))
  })
  await createActApi({ ...formState, status })
}
const resetForm = () => {
  formRef.value.resetFields()
}

const { getCollegeList } = useCollegeStore()
const { collegeList } = storeToRefs(useCollegeStore())

onMounted(() => {
  getCollegeList()
})
</script>

<template>
  <div class="flex">
    <div>
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        style="width: 450px"
      >
        <a-form-item label="活动主题" name="title">
          <a-input
            v-model:value="formState.title"
            placeholder="请输入活动主题"
            class="w-64"
          />
        </a-form-item>

        <a-form-item label="举办学院" name="college">
          <a-select
            v-model:value="formState.college"
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
            v-model:value="formState.signupdeadline"
            show-time
            type="date"
            placeholder="请选择报名截止时间"
            class="w-64"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </a-form-item>
        <a-form-item label="活动举行时间" required name="holdtime">
          <a-date-picker
            v-model:value="formState.holdtime"
            show-time
            type="date"
            placeholder="请选择活动举行时间"
            class="w-64"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </a-form-item>
        <a-form-item label="线上地址" name="addressonline">
          <a-input
            v-model:value="formState.addressonline"
            placeholder="请输入线上地址"
            class="w-64"
          />
        </a-form-item>
        <a-form-item label="线下地址" name="addressoffline">
          <a-input
            v-model:value="formState.addressoffline"
            placeholder="请输入线下地址"
            class="w-64"
          />
        </a-form-item>
        <a-form-item label="主讲人" name="speaker">
          <a-input
            v-model:value="formState.speaker"
            class="w-64"
            placeholder="请输入主讲人"
          />
        </a-form-item>
        <a-form-item label="QQ群" name="qqgroup">
          <a-input
            v-model:value="formState.qqgroup"
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
                v-model:value="formState.totalnumber"
                placeholder="活动总人数"
                class="w-64"
                type="number"
              />
            </a-form-item>
          </div>
        </div>

        <a-form-item label="菁英会员人数" name="totalnumber">
          <a-input
            v-model:value="formState.totalvipnumber"
            placeholder="请输入菁英会员人数"
            class="w-64"
            type="number"
          />
        </a-form-item>

        <a-form-item label="非菁英会员人数" name="totalnumber">
          <a-input
            v-model:value="formState.totalnotvipnumber"
            placeholder="请输入非菁英会员人数"
            class="w-64"
            type="number"
          />
        </a-form-item>
      </a-form>
    </div>
    <div>
      <Editor v-model="formState.content"></Editor>
      <div>
        <a-button type="primary" @click="onSubmit(0)">保存</a-button>
        <a-button type="primary" @click="onSubmit(1)">发布</a-button>
        <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
