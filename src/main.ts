import { createApp } from 'vue'
import '@/style.css'

import 'material-icons/iconfont/material-icons.css'

import router from '@/routes'

import App from '@/App.vue'

const app = createApp(App)
app.use(router)
app.mount('#app')
