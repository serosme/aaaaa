import type { RouteRecordRaw } from 'vue-router'
import lucideIcons from '@iconify-json/lucide/icons.json'
import { addCollection } from '@iconify/vue'
import ui from '@nuxt/ui/vue-plugin'
import { setupLayouts } from 'virtual:generated-layouts'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'
import App from './App.vue'
import './assets/css/main.css'

addCollection(lucideIcons)

const router = createRouter({
  history: createWebHashHistory(),
  routes: setupLayouts(routes as RouteRecordRaw[]),
})

const app = createApp(App)

app.use(router)
app.use(ui)

app.mount('#app')

// This will update routes at runtime without reloading the page
if (import.meta.hot) {
  handleHotUpdate(router)
}
