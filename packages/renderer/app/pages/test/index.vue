<script setup lang="ts">
const testWindowId = ref<number | null>(null)

async function openSetting() {
  testWindowId.value = await electron.window.create('/setting')
}

async function closeSetting() {
  if (testWindowId.value !== null) {
    await electron.window.close(testWindowId.value)
    testWindowId.value = null
  }
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <UButton
      color="primary"
      icon="i-lucide-plus"
      @click="openSetting"
    >
      打开 Setting
    </UButton>
    <UButton
      color="error"
      icon="i-lucide-x"
      :disabled="testWindowId === null"
      @click="closeSetting"
    >
      关闭 Setting
    </UButton>
  </div>
</template>
