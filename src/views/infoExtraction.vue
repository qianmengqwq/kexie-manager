<script lang="ts" setup>
import { getPostedActListApi } from '@/apis/activity'
import {
  getFilteredResultById,
  filterSignupInfoApi,
  getSignupInfoByIdApi,
  getSignUpInfoListApi,
} from '@/apis/signup'
import { ref, onMounted } from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import type { Activity, PageParam, Student } from '@/types'

interface ListData {
  vipList: Student[]
  notVipList: Student[]
  vipNumber: number
  notVipNumber: number
}

// 默认一个activityid，以防传undefined
const activeItem = ref<Activity>({
  activityid: 0,
} as Activity)

const postedActList = ref<Activity[]>()
const signupInfoList = ref<Student[]>()

const listData = ref<ListData>({
  vipList: [],
  notVipList: [],
  vipNumber: 0,
  notVipNumber: 0,
})

const getPostedActList = async () => {
  const [e, r] = await getPostedActListApi()
  if (!e && r) {
    const { result } = r
    postedActList.value = result.rows
  }
}

const getSignupInfo = async () => {
  const [e, r] = await getSignupInfoByIdApi(activeItem.value.activityid!)
  if (!e && r) {
    signupInfoList.value = r.result
  }
}

const doFilter = async () => {
  const [e, r] = await filterSignupInfoApi(activeItem.value.activityid!)
  if (!e && r) {
    const {
      result: { vip, notVip, vipCounts, notVipCounts },
    } = r
    listData.value = {
      vipList: vip,
      notVipList: notVip,
      vipNumber: vipCounts,
      notVipNumber: notVipCounts,
    }
    getFilteredData()
    getSignupInfo()
    getTableData()
  }
}

const getFilteredData = async () => {
  const [e, r] = await getFilteredResultById(activeItem.value.activityid!)
  if (!e && r) {
    const {
      result: { listVip, listNotVip, vipCounts, notVipCounts },
    } = r
    listData.value = {
      vipList: listVip,
      notVipList: listNotVip,
      vipNumber: vipCounts,
      notVipNumber: notVipCounts,
    }
  }
}
const toggleAct = async (activity: Activity) => {
  //存一份当前活动
  activeItem.value = activity
  //获取过滤后的信息
  getFilteredData()
  //获取报名信息
  getSignupInfo()
  //获取底部报名信息table
  getTableData()
}

const pageParam = ref<PageParam>({
  page: 1,
  pageSize: 10,
  total: 0,
})
const getTableData = async () => {
  const [e, r] = await getSignUpInfoListApi(pageParam.value)
  if (!e && r) {
    const { result } = r
    console.log(result)
    pageParam.value.total = result.total
    signupInfoList.value = result.rows
  }
}

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '学号',
    dataIndex: 'studentid',
    key: 'studentid',
  },
  {
    title: '学院',
    dataIndex: 'college',
    key: 'college',
  },
  {
    title: '专业',
    dataIndex: 'major',
    key: 'major',
  },
  {
    title: '班级',
    dataIndex: 'clazz',
    key: 'clazz',
  },
  {
    title: '是否为vip',
    dataIndex: 'vip',
    key: 'vip',
  },
]

onMounted(async () => {
  getPostedActList()
})
</script>

<template>
  <PageHeader></PageHeader>
  <div class="flex">
    <div class="w-1/4">
      <div class="text-xl mb-5">先选择一个活动</div>
      <a-list item-layout="horizontal" :data-source="postedActList">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta description="description">
              <template #title>
                <a @click="toggleAct(item)">{{ item.title }}</a>
              </template>
              <template #avatar>
                <a-avatar shape="square" src="" />
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </div>
    <div class="w-3/4">
      <!-- header -->
      <div class="flex gap-x-2">
        <span>
          <p class="text-xl">已筛选的结果(若无数据，请先点击过滤按钮)</p>
        </span>
        <a-button @click="doFilter">过滤</a-button>
      </div>
      <!-- list -->
      <div class="flex h-64">
        <div class="w-1/2 px-3">
          <a-list
            size="small"
            bordered
            :data-source="listData.vipList"
            class="h-64"
          >
            <template #renderItem="{ item }">
              <a-list-item>{{ item.name }}</a-list-item>
            </template>
            <template #header>
              <div>vip</div>
            </template>
          </a-list>
        </div>
        <div class="w-1/2">
          <a-list
            size="small"
            bordered
            :data-source="listData.notVipList"
            class="h-64"
          >
            <template #renderItem="{ item }">
              <a-list-item>{{ item.name }}</a-list-item>
            </template>
            <template #header>
              <div>非vip</div>
            </template>
          </a-list>
        </div>
      </div>
      <!-- table -->
      <div class="mt-4 flex flex-col h-64">
        <a-table :dataSource="signupInfoList" :columns="columns" />
      </div>
    </div>
  </div>
</template>
