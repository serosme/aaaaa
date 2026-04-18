<script setup>
import { useMediaControls } from '@vueuse/core'
import { onMounted, ref } from 'vue'

const list = ref([])
const audioElement = ref(null)
const src = ref('')

const { playing, currentTime, duration } = useMediaControls(audioElement, { src })

async function loadMusic() {
  const data = await $fetch('/api/music')
  list.value = data
  if (data[0])
    src.value = `/api/music/${data[0].id}`
}

const play = item => (current.value = `/api/music/${item.id}`)

onMounted(loadMusic)
</script>

<template>
  <div>
    <h3>音乐列表</h3>
    <ul>
      <li v-for="item in list" :key="item.id">
        <button @click="play(item)">
          {{ item.name }}
        </button>
      </li>
    </ul>
    <hr>

    <audio ref="audioElement" controls />

    <!-- 可选：显示播放状态信息 -->
    <div v-if="src">
      状态: {{ playing ? '播放中' : '暂停' }} |
      进度: {{ currentTime.toFixed(1) }}s / {{ duration.toFixed(1) }}s
    </div>
  </div>
</template>
