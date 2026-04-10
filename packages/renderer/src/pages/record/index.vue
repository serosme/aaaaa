<script setup lang="ts">
import { useRecorder } from '@/composables/useRecorder'

const { isRecording, audioBlob, toggleRecording, audioBase64 } = useRecorder()

function playAudio() {
  if (audioBlob.value) {
    const audio = new Audio(URL.createObjectURL(audioBlob.value))
    audio.play()
  }
  if (audioBase64) {
    console.log(audioBase64.value)
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen gap-6">
    <h1 class="text-2xl font-bold">
      录音
    </h1>

    <UButton
      :color="isRecording ? 'success' : 'error'"
      size="xl"
      :icon="isRecording ? 'i-lucide-square' : 'i-lucide-mic'"
      @click="toggleRecording"
    >
      {{ isRecording ? '停止录音' : '开始录音' }}
    </UButton>

    <div v-if="audioBlob" class="flex flex-col items-center gap-4">
      <p class="text-sm text-gray-500">
        录音完成：{{ (audioBlob.size / 1024).toFixed(2) }} KB
      </p>
      <UButton
        color="success"
        icon="i-lucide-play"
        @click="playAudio"
      >
        播放录音
      </UButton>
    </div>
  </div>
</template>
