<script setup lang="ts">
import type { Music } from 'shared'
import { useMediaControls } from '@vueuse/core'
import { onMounted, useTemplateRef } from 'vue'

const list = ref<Music[]>([])
const src = ref('')

async function loadMusic() {
  const data = await $fetch('/api/music')
  list.value = data
  if (data[0])
    src.value = `/api/music/${data[0].id}`
}

onMounted(loadMusic)

const video = useTemplateRef('audio')
const { playing, currentTime, duration, volume } = useMediaControls(video, {
  src,
})

// Change initial media properties
onMounted(() => {
  volume.value = 0.5
  currentTime.value = 60
})
</script>

<template>
  <ul>
    <li v-for="item in list" :key="item.id">
      {{ item.name }}
    </li>
  </ul>
  <audio ref="audio" />
  <button @click="playing = !playing">
    Play / Pause
  </button>
  <span>{{ currentTime }} / {{ duration }}</span>
</template>
