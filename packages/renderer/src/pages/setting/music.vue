<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import type { MusicSchema } from 'shared'
import { reactive } from 'vue'

const music = reactive<MusicSchema>({
  path: 'C:\\Users\\User\\Downloads',
})

async function onSubmit(event: FormSubmitEvent<MusicSchema>) {
  await window.electronAPI.config.set('music', event.data)
}

async function selectMusicPath() {
  const path = await window.electronAPI.selectDirectory()

  if (path) {
    music.path = path
  }
}
</script>

<route lang="yaml">
meta:
  layout: setting
</route>

<template>
  <UCard class="h-full">
    <UForm :state="music" @submit="onSubmit">
      <UPageCard
        title="音乐"
        variant="naked"
        orientation="horizontal"
        class="mb-4"
      >
        <UButton
          label="Save changes"
          type="submit"
          class="w-fit lg:ms-auto"
        />
      </UPageCard>
      <UPageCard>
        <UFormField
          label="音乐库位置"
          description="Will appear on receipts, invoices, and other communication."
          class="flex max-sm:flex-col justify-between items-start gap-4"
        >
          <UInput v-model="music.path" readonly @click="selectMusicPath" />
        </UFormField>
        <USeparator />
        <UFormField
          label="密钥"
          description="Used to sign in, for email receipts and product updates."
          class="flex max-sm:flex-col justify-between items-start gap-4"
        >
          <UInput
            type="password"
          />
        </UFormField>
      </UPageCard>
    </UForm>
  </UCard>
</template>
