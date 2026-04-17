<script setup lang="ts">
const { data } = await useFetch('/api/hello')
const { data: aa } = await useFetch('/api/conf/music')
const { data: aaa } = await useFetch('/api/conf/music', {
  method: 'POST',
})
</script>

<template>
  <pre>{{ data }}</pre>
  <pre>{{ aa }}</pre>
  <pre>{{ aaa }}</pre>
</template>
