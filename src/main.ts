import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import 'ant-design-vue/dist/reset.css'
import Antd from 'ant-design-vue'
import router from '@/router'

const app = createApp(App)
app.use(router).use(Antd).mount('#app')
