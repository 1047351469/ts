<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref,toRefs,PropType } from 'vue'

import type { ArticleItem, ArticleResData,ChannelType } from '../types/data'
// 定义组件props类型
enum UserRole {
  Admin = 'admin',
  User = 'user',
  Guest = 'guest'
}
type User = {
  id: number;
  name: string;
};
type Props = {
  // number string boolean [] object
  channelId: number,
  isActive?: boolean,
  arr?: number[] ,
  channelType:ChannelType,
  user:User,
  role: UserRole;
  users: User[]
  
}
// withDefaults默认值
const props = withDefaults(defineProps<Props>(),{
  isActive: false
})
const { isActive,channelId } = toRefs(props)
const emit = defineEmits<{
  (e: 'click', value: number): void
}>()

const handleClick = () => {
  emit('click', channelId)
}





// 1. 定义响应式列表数据
const list = ref<ArticleItem[]>()

// 2. axios.request获取数据
const getList = async () => {
  const res = await axios.request<ArticleResData>({
    url: 'http://geek.itheima.net/v1_0/articles',
    method: 'GET',
    params: {
      channel_id: props.channelId,
      timestamp: Date.now()
    }
  })
  list.value = res.data.data.results
}
onMounted(() => getList())

</script>

<template>
  <div class="list-box" @click="handleClick">
    <!-- 列表 -->
    <van-cell v-for="item in list" :key="item.art_id">
      <!-- 标题区域的插槽 -->
      <template #title>
        <!-- 无图模式 -->
        <div class="title-box" v-if="item.cover.type === 0">
          <!-- 标题 -->
          <span> {{ item.title }} </span>
        </div>

        <!-- 单图模式 -->
        <div class="title-box" v-if="item.cover.type === 1">
          <span>{{ item.title }}</span>
          <img class="thumb" :src="item.cover.images[0]" />
        </div>

        <!-- 三图模式 -->
        <div class="thumb-box" v-if="item.cover.type === 3">
          <img class="thumb" v-for="img in item.cover.images" :src="img" :key="img" />
        </div>
      </template>
      <!-- label 区域的插槽 -->
      <template #label>
        <div class="label-box">
          <div>
            <span>{{ item.aut_name }}</span>
            <span>{{ item.comm_count }}评论</span>
            <span>{{ item.pubdate }}</span>
          </div>
        </div>
      </template>
    </van-cell>

  </div>
</template>


<style scoped lang="less">
.list-box {
  position: fixed;
  top: 50px;
  bottom: 0;
  width: 100%;
  overflow-y: auto;
}

/* 标题样式 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span {
  margin: 0 3px;

  &:first-child {
    margin-left: 0;
  }
}

/* 图片的样式, 矩形黄金比例：0.618 */
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

/* 三图, 图片容器 */
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>