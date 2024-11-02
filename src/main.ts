import { createApp } from 'vue'
import '@/style.css'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import 'material-icons/iconfont/outlined.css'

const options = {
    position: 'bottom-center',
    timeout: 2000,
    transition: 'Vue-Toastification__fade',
}

import router from '@/routes'

import App from '@/App.vue'

const app = createApp(App)
app.use(router)
app.use(Toast, options)
app.mount('#app')
