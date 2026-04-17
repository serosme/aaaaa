// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  ui: {
    fonts: false,
  },
  icon: {
    provider: 'none',
    clientBundle: {
      scan: true,
      icons: [
        'lucide:search',
        'lucide:menu',
        'lucide:check',
        'lucide:x',
      ],
    },
  },
  vite: {
    optimizeDeps: {
      include: [
        '@vueuse/core',
      ],
    },
  },
})
