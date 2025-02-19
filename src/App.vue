<script setup lang="ts">
import { onMounted, ref } from 'vue'
import List from './components/List.vue'
import axios from 'axios'

import type { ChannelItem, ChannelRes } from './types/data'

import  {ChannelType } from './types/data.d.ts'
// 核心实现步骤

// 1. 声明响应式列表数据 (ref + TS)
const channelList = ref<ChannelItem[]>([])

// 2. axios获取后端数据 (axios.request<类型>)
const getList = async () => {
  const res = await axios.request<ChannelRes>({
    url: 'http://geek.itheima.net/v1_0/channels',
    method: 'GET'
  })
  // 3. 后端数据赋值给响应式列表 (类型自然匹配)
  channelList.value = res.data.data.channels
}

onMounted(() => getList())


// 4. 响应式列表渲染到模板 (类型提示)

// 频道id
const channelId = ref(0)
const tabChange = (id: number) => {
  console.log(id)
  channelId.value = id
}
console.log(ChannelType.NEWS)
enum UserRole {
  Admin = 'admin',
  User = 'user',
  Guest = 'guest'
}
</script>

<template>
  <!-- tab切换 -->
  <van-tabs @change="tabChange">
    <van-tab  v-for="item in channelList" :key="item.id" :title="item.name">
      <!-- 文章列表 -->
      <List :users="[{age:1}]" :role="UserRole.Admin" :user="{id:1,name:'cai'}" :isActive="1" :channelType="1" :arr="[1,2]" :channel-id="channelId" @click="(num:number)=>console.log(num)" />
    </van-tab>
  </van-tabs>

</template>
