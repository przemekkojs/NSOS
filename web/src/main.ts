import './assets/css/main.css'
import './assets/css/fullcalendar.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ui from '@nuxt/ui/vue-plugin'
import App from './App.vue'
import router from './core/router'
import { storagePlugin } from './core/lib/pinia-plugins'

const pinia = createPinia()
const app = createApp(App)

async function enableMocking() {
  if (!import.meta.env.DEV || import.meta.env.VITE_MSW !== 'true') return

  const { worker } = await import('./mocks/browser')

  return worker.start({
    onUnhandledRequest(request, print) {
      const url = new URL(request.url)

      if (!url.hostname.includes('localhost:8000')) {
        return
      }

      print.warning()
    },
  })
}

await enableMocking()

app.use(pinia)
app.use(ui)
app.use(router)

pinia.use(storagePlugin)

app.mount('#app')
