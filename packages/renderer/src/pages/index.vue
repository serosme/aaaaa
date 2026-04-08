<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchTerm = ref('')

interface CommandItem {
  label: string
  icon: string
  onSelect: () => unknown | Promise<unknown>
}

// Pages
const pages = [
  {
    label: 'Chat',
    icon: 'i-lucide-globe',
    onSelect: selectAndClear(() => router.replace('/chat')),
  },
  {
    label: 'Test',
    icon: 'i-lucide-globe',
    onSelect: selectAndClear(() => router.replace('/test')),
  },
]

// Applications
const appItems = ref<CommandItem[]>([])

onMounted(async () => {
  try {
    const apps = await window.electronAPI.getApplications()
    appItems.value = apps.map(app => ({
      label: app.name,
      icon: 'i-lucide-app-window',
      onSelect: selectAndClear(() =>
        window.electronAPI.launchApplication(app.appId),
      ),
    }))
  }
  catch (error) {
    console.error('Failed to load applications.', error)
    appItems.value = []
  }
})

// 分组数组
const groups = computed(() => [
  {
    id: 'pages',
    label: 'Pages',
    items: pages,
  },
  {
    id: 'applications',
    label: 'Applications',
    items: appItems.value,
  },
])

function selectAndClear(fn: () => unknown | Promise<unknown>) {
  return async () => {
    searchTerm.value = ''
    try {
      await fn()
    }
    catch (error) {
      console.error('Command execution failed.', error)
    }
  }
}
</script>

<template>
  <div class="bg-white">
    <UCommandPalette
      v-model:search-term="searchTerm"
      :groups="groups"
      :fuse="{
        resultLimit: 7,
        matchAllWhenSearchEmpty: false,
      }"
      class="border-2 border-red-500"
    />
  </div>
</template>
