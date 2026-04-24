<script setup lang="ts">
const volume = ref(80)
const currentTime = ref(0)
const totalTime = ref(240)

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}
</script>

<template>
  <div class="flex h-screen flex-col">
    <div id="1" class="flex flex-1">
      <div id="1-1" class="w-1/3 bg-gray-100" />
      <div id="1-2" class="flex-1 bg-gray-200" />
    </div>
    <div id="2" class="flex h-1/6 gap-6 px-6">
      <div id="2-1" class="w-1/5 flex items-center gap-4">
        <NuxtImg
          src="https://picsum.photos/200"
          class="rounded-md size-16 object-cover shrink-0"
        />
        <div class="flex flex-col truncate">
          <span class="text-lg font-medium truncate">夜空中最亮的星</span>
          <span class="text-base text-gray-500 truncate">逃跑计划</span>
        </div>
      </div>
      <div id="2-2" class="w-3/5 flex flex-col items-center justify-center gap-3">
        <div class="flex items-center justify-center gap-10">
          <Icon name="solar:shuffle-outline" class="text-neutral cursor-pointer" size="1.5em" />
          <Icon name="solar:skip-previous-bold" class="text-neutral cursor-pointer" size="1.5em" />
          <Icon name="solar:play-circle-bold" class="text-primary cursor-pointer" size="3em" />
          <Icon name="solar:skip-next-bold" class="text-neutral cursor-pointer" size="1.5em" />
          <Icon name="solar:repeat-outline" class="text-neutral cursor-pointer" size="1.5em" />
        </div>
        <div class="flex items-center gap-2 w-full max-w-2xl">
          <span class="text-sm tabular-nums">{{ formatTime(currentTime) }}</span>
          <USlider
            v-model="currentTime"
            :min="0"
            :max="totalTime"
            class="flex-1"
          />
          <span class="text-sm tabular-nums">{{ formatTime(totalTime) }}</span>
        </div>
      </div>
      <div id="2-3" class="w-1/5 flex items-center gap-2">
        <UButton
          icon="solar:volume-loud-outline"
          variant="link"
          color="neutral"
          class="cursor-pointer"
        />
        <USlider
          v-model="volume"
          :min="0"
          :max="100"
          class="flex-1"
        />
      </div>
    </div>
  </div>
</template>
