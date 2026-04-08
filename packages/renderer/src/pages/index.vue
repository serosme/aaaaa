<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchTerm = ref('')

// Pages
const pages = [
  {
    label: 'Chat',
    icon: 'i-lucide-globe',
    onSelect: selectAndClear(() => router.replace('/chat')),
  },
  {
    label: 'Music',
    icon: 'i-lucide-globe',
    onSelect: selectAndClear(() => router.replace('/music')),
  },
  {
    label: 'Music1',
    icon: 'i-lucide-globe',
    onSelect: selectAndClear(() => router.replace('/music1')),
  },
  {
    label: 'Setting',
    icon: 'i-lucide-globe',
    onSelect: selectAndClear(() => router.replace('/setting')),
  },
  {
    label: 'Test',
    icon: 'i-lucide-globe',
    onSelect: selectAndClear(() => router.replace('/test')),
  },
  {
    label: 'Recorder',
    icon: 'i-lucide-globe',
    onSelect: selectAndClear(() => router.replace('/recorder')),
  },
]

// 分组数组
const groups = computed(() => [
  {
    id: 'pages',
    label: 'Pages',
    items: pages,
  },
])

function selectAndClear(fn: () => void) {
  return () => {
    searchTerm.value = ''
    fn()
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
