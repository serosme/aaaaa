import lucideIcons from '@iconify-json/lucide/icons.json'
import { addCollection } from '@iconify/vue'
import ui from '@nuxt/ui/vue-plugin'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'
import './assets/css/main.css'

addCollection(lucideIcons)

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const app = createApp(App)

app.use(router)
app.use(ui)

app.mount('#app')
