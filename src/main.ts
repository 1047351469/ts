import { createApp } from 'vue'

import App from './App.vue'
// 引入vant相关组件和样式
import { Tab, Tabs, Cell } from 'vant'
import 'vant/lib/index.css'
import './style.css'

const app = createApp(App)
// 注册vant组件
app.use(Tab)
app.use(Tabs)
app.use(Cell)

app.mount('#app')


