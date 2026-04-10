<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core'
import { watch } from 'vue'

const keys = useMagicKeys()
const key = keys['Alt+`']

watch(() => key?.value, (pressed) => {
  if (pressed) {
    console.log('空格键被按下')
  }
  else {
    console.log('空格键抬起')
  }
})
</script>

<template>
  <UApp>
    <RouterView />
  </UApp>
</template>
