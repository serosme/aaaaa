<script setup lang="ts">
const input = ref('')

function submit() {
  console.log(input.value)
  input.value = ''
}
</script>

<template>
  <div class="p-4">
    <UChatPrompt v-model="input" @submit="submit">
      <UChatPromptSubmit class="cursor-pointer" />
    </UChatPrompt>
  </div>
</template>
