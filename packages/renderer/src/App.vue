<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core'
import { watch } from 'vue'
import { useSpeechRecognition } from '@/composables/useSpeechRecognition'

const { result, start, stop } = useSpeechRecognition()

const keys = useMagicKeys()
const key = keys['Alt+`']

watch(result, (result) => {
  console.log(result)
})

watch(() => key?.value, (pressed) => {
  if (pressed) {
    console.log('开始录音')
    start()
  }
  else {
    console.log('结束录音')
    stop()
  }
})
</script>

<template>
  <UApp>
    <RouterView />
  </UApp>
</template>
