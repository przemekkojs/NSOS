import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import VueRouter from 'unplugin-vue-router/vite'
import vue from '@vitejs/plugin-vue'
import ui from '@nuxt/ui/vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import { unheadVueComposablesImports } from '@unhead/vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VueRouter(),
    vue(),
    ui({
      autoImport: {
        imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/core', unheadVueComposablesImports],
        dts: true,
      },
      ui: {
        colors: {
          primary: 'indigo',
        },
        input: {
          slots: {
            root: 'w-full',
          },
        },
      },
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    dedupe: ['@vueuse/core', '@vueuse/shared'],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
