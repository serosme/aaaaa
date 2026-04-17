<script setup lang="ts">
import type { MusicConf } from 'shared'

const musicConf = await $fetch<MusicConf>('/api/conf/music')

const success = ref(false)

async function setConf() {
  success.value = await $fetch<boolean>('/api/conf/music', {
    method: 'post',
    body: musicConf,
  })
}
</script>

<template>
  <pre>{{ musicConf }}</pre>
  <UButton @click="setConf()">
    保存
  </UButton>
  <pre>{{ success }}</pre>
</template>
