import { createApp } from 'vue'
import App from './App.vue'

// css
import './style.css'
import 'ant-design-vue/dist/reset.css'

//plugin
import Antd from 'ant-design-vue'
import router from '@/router'
import store from './stores'

const app = createApp(App)

app.use(router).use(Antd).use(store).mount('#app')
