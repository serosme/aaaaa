<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

const volume = ref(80)
const currentTime = ref(0)
const totalTime = ref(240)

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

interface MusicItem {
  index: number
  name: string
  duration: string
}

const musicList = ref<MusicItem[]>([])

onMounted(async () => {
  const list = await $fetch('/api/music')
  musicList.value = list.map((item, i) => ({
    index: i + 1,
    name: item.name,
    duration: '',
  }))
})

const columns: TableColumn<MusicItem>[] = [
  { accessorKey: 'index', header: '#', meta: { class: { th: 'w-12', td: 'text-gray-500' } } },
  { accessorKey: 'name', header: '名称' },
  { accessorKey: 'duration', header: '时长', meta: { class: { th: 'w-20', td: 'text-gray-500' } } },
]
</script>

<template>
  <div class="flex h-screen flex-col">
    <div id="1" class="flex flex-1">
      <div id="1-1" class="w-1/3">
        <UTable
          :data="musicList"
          :columns="columns"
          class="h-full"
        />
      </div>
      <div id="1-2" class="flex-1 bg-gray-200" />
    </div>
    <div id="2" class="flex h-1/6 gap-6 px-6">
      <div id="2-1" class="w-1/5 flex items-center gap-4">
        <NuxtImg
          src="https://picsum.photos/200"
          class="rounded-md size-16 object-cover shrink-0"
        />
        <div class="flex flex-col truncate">
          <span class="text-lg font-medium truncate">夜空中最亮的星</span>
          <span class="text-base text-gray-500 truncate">逃跑计划</span>
        </div>
      </div>
      <div id="2-2" class="w-3/5 flex flex-col items-center justify-center gap-3">
        <div class="flex items-center justify-center gap-8">
          <Icon name="solar:shuffle-outline" class="text-neutral cursor-pointer" size="1.5em" />
          <Icon name="solar:skip-previous-bold" class="text-neutral cursor-pointer" size="1.5em" />
          <Icon name="solar:play-circle-bold" class="text-primary cursor-pointer" size="3em" />
          <Icon name="solar:skip-next-bold" class="text-neutral cursor-pointer" size="1.5em" />
          <Icon name="solar:repeat-outline" class="text-neutral cursor-pointer" size="1.5em" />
        </div>
        <div class="flex items-center gap-2 w-full max-w-2xl">
          <span class="text-sm tabular-nums">{{ formatTime(currentTime) }}</span>
          <USlider
            v-model="currentTime"
            :min="0"
            :max="totalTime"
            class="flex-1"
          />
          <span class="text-sm tabular-nums">{{ formatTime(totalTime) }}</span>
        </div>
      </div>
      <div id="2-3" class="w-1/5 flex items-center gap-2">
        <UButton
          icon="solar:volume-loud-outline"
          variant="link"
          color="neutral"
          class="cursor-pointer"
        />
        <USlider
          v-model="volume"
          :min="0"
          :max="100"
          class="flex-1"
        />
      </div>
    </div>
  </div>
</template>
