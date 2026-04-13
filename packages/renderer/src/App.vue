<script setup lang="ts">
import { useClipboard, useMagicKeys } from '@vueuse/core'
import { watch } from 'vue'
import { useSpeechRecognition } from '@/composables/useSpeechRecognition'
import { useSpeechRecognitionToast } from '@/composables/useToast'

const { add, remove } = useSpeechRecognitionToast()
const { result, start, stop } = useSpeechRecognition()

const { copy } = useClipboard()
watch(result, (result) => {
  copy(result)
  console.log(result)
})

const { space } = useMagicKeys()
watch(() => space?.value, (pressed) => {
  if (pressed) {
    start()
    add()
  }
  else {
    stop()
    remove()
  }
})
</script>

<template>
  <UApp>
    <RouterView />
  </UApp>
</template>
