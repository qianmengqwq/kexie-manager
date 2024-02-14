<script lang="ts" setup>
import { getPostedActListApi } from '@/apis/activity'
import { ref, onMounted } from 'vue'
import type { Activity, PageParam } from '@/types'

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

const savedActList = ref<Activity[]>()
const isLoading = ref(true)
const pageParam = ref<PageParam>({
  page: 1,
  pageSize: 10,
  total: 0,
})

const getSavedActList = async () => {
  const [e, r] = await getPostedActListApi()
  if (!e && r) {
    const { result } = r
    savedActList.value = result.rows
    pageParam.value.total = result.total
    isLoading.value = false
  }
}

onMounted(async () => {
  getSavedActList()
})
</script>
<template>
  <a-table
    :columns="columns"
    :data-source="savedActList"
    bordered
    :loading="isLoading"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <span class="text-blue-500">
          <router-link
            :to="{
              path: '/actDetail',
              query: { activityId: record.activityId },
            }"
            >详情</router-link
          >
        </span>
      </template>
    </template>
  </a-table>
</template>
