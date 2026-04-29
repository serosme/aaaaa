<script setup lang="ts">
const { groups } = useCommand()
const value = ref({})
</script>

<template>
  <UCommandPalette v-model="value" :groups="groups" class="flex-1 h-80" />
</template>
