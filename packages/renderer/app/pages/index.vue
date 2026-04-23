<script setup lang="ts">
const searchTerm = ref('')

interface CommandItem {
  label: string
  icon: string
  onSelect: () => unknown | Promise<unknown>
}

// Pages
const pages = [
  {
    label: 'Music',
    icon: 'i-lucide-globe',
    onSelect: selectAndClear(() => electron.window.create('/music')),
  },
  {
    label: 'Setting',
    icon: 'i-lucide-globe',
    onSelect: selectAndClear(() => electron.window.create('/setting')),
  },
  {
    label: 'Chat',
    icon: 'i-lucide-globe',
    onSelect: selectAndClear(() => electron.window.create('/chat')),
  },
  {
    label: 'Test',
    icon: 'i-lucide-globe',
    onSelect: selectAndClear(() => electron.window.create('/test')),
  },
]

// Applications
const { apps, launch } = useApp()
const appItems = computed<CommandItem[]>(() =>
  apps.value.map(app => ({
    label: app.name,
    icon: 'i-lucide-app-window',
    onSelect: selectAndClear(() => launch(app.base64url),
    ),
  })),
)

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

const visibleGroups = computed(() => {
  return searchTerm.value.trim() ? groups.value : []
})

const commandPaletteUi = computed(() => ({
  empty: searchTerm.value.trim() ? '' : 'hidden',
}))

function selectAndClear(fn: () => unknown | Promise<unknown>) {
  return async () => {
    try {
      await fn()
    }
    catch (error) {
      console.error('Command execution failed.', error)
    }
    searchTerm.value = ''
  }
}
</script>

<template>
  <div class="bg-white">
    <UCommandPalette
      v-model:search-term="searchTerm"
      :groups="visibleGroups"
      :ui="commandPaletteUi"
      :fuse="{
        resultLimit: 7,
      }"
      @keydown.space.prevent
    />
  </div>
</template>
