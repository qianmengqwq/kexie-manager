<script lang="ts" setup>
import {
  getPostedActListApi,
  getSavedActListApi,
  deleteActByIdApi,
  updateActApi,
} from '@/apis/activity'
import PageHeader from '@/components/PageHeader.vue'
import { ref, onMounted } from 'vue'
import { ActivityStatusEnum } from '@/enums'
import type { Activity, PageParam } from '@/types'

const props = defineProps<{ listType: 'posted' | 'saved' }>()

const columns = [
  {
    title: '主题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '举行时间',
    dataIndex: 'holdtime',
    key: 'holdtime',
  },
  {
    title: '主讲人',
    dataIndex: 'speaker',
    key: 'speaker',
  },
  {
    title: '举办学院',
    dataIndex: 'college',
    key: 'college',
  },
  {
    title: '总人数',
    dataIndex: 'totalnumber',
    key: 'totalnumber',
  },
  {
    title: '会员人数',
    dataIndex: 'totalvipnumber',
    key: 'totalvipnumber',
  },
  {
    title: '操作',
    key: 'action',
  },
]

const postedActList = ref<Activity[]>()
const savedActList = ref<Activity[]>()
const isLoading = ref(true)
const pageParam = ref<PageParam>({
  page: 1,
  pageSize: 10,
  total: 0,
})

const getPostedActList = async () => {
  const [e, r] = await getPostedActListApi()
  if (!e && r) {
    const { result } = r
    postedActList.value = result.rows
    pageParam.value.total = result.total
    isLoading.value = false
  }
}

const getSavedActList = async () => {
  const [e, r] = await getSavedActListApi()
  if (!e && r) {
    const { result } = r
    savedActList.value = result.rows
    pageParam.value.total = result.total
    isLoading.value = false
  }
}

const handleDelete = async (id: string) => {
  const [e, r] = await deleteActByIdApi(id)
  if (!e && r) {
    getPostedActList()
  }
}

const handleOperate = async (record: Activity) => {
  record.status =
    props.listType === 'posted'
      ? ActivityStatusEnum.SAVED
      : ActivityStatusEnum.POSTED
  const [e, r] = await updateActApi(record)
  if (!e && r) {
    props.listType === 'posted' ? getPostedActList() : getSavedActList()
  }
}

onMounted(async () => {
  props.listType === 'posted' ? getPostedActList() : getSavedActList()
})
</script>
<template>
  <PageHeader></PageHeader>
  <a-table
    :columns="columns"
    :data-source="props.listType === 'posted' ? postedActList : savedActList"
    bordered
    :loading="isLoading"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <span class="text-blue-500">
          <router-link
            :to="{
              name: 'actDetail',
              params: { activityid: record.activityid },
            }"
            >详情</router-link
          >
          <a class="ml-2" @click="handleDelete(record.activityid)">删除</a>
          <a class="ml-2" @click="handleOperate(record)">{{
            listType === 'posted' ? '撤回' : '发布'
          }}</a>
        </span>
      </template>
    </template>
  </a-table>
</template>
