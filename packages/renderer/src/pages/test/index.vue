<script setup lang="ts">
import { useSpeechRecognition } from '@/composables/useSpeechRecognition'

const { base64, result, start, stop, isListening } = useSpeechRecognition()
</script>

<template>
  <div>
    <p>
      {{ result }}
    </p>
    <p>
      {{ base64 }}
    </p>
    <UButton
      :color="isListening ? 'error' : 'success' "
      :icon="isListening ? 'i-lucide-square' : 'i-lucide-mic'"
      @click="isListening ? stop() : start() "
    >
      {{ isListening ? '停止录音' : '开始录音' }}
    </UButton>
  </div>
</template>
