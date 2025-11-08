import './assets/css/main.css'
import './assets/css/fullcalendar.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ui from '@nuxt/ui/vue-plugin'
import App from './App.vue'
import router from './router'
import { storagePlugin } from './core/lib/pinia-plugins'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(ui)
app.use(router)

pinia.use(storagePlugin)

app.mount('#app')
