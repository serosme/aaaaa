<script setup lang="ts">
import { onMounted, ref } from 'vue'

const version = ref('')

onMounted(async () => {
  version.value = await window.electronAPI.getNodeVersion()
})
</script>

<template>
  <div>
    <h2>Node version:</h2>
    <p>{{ version }}</p>
  </div>
</template>
