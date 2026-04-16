<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import type { AsrConf } from 'shared'
import { onMounted, reactive, toRaw } from 'vue'
import { electron } from '@/utils/electron'

const toast = useToast()

const asr = reactive<AsrConf>({
  key: '',
})

onMounted(async () => {
  const data = await electron.conf.asr.get()
  asr.key = data.key
})

async function onSubmit(event: FormSubmitEvent<AsrConf>) {
  await electron.conf.asr.set({ ...toRaw(event.data) })
  toast.add({
    title: '成功',
    color: 'success',
    duration: 1200,
  })
}
</script>

<route lang="yaml">
meta:
  layout: setting
</route>

<template>
  <UCard class="h-full">
    <UForm :state="asr" @submit="onSubmit">
      <UPageCard
        title="语音识别"
        variant="naked"
        orientation="horizontal"
        class="mb-4"
      >
        <UButton
          label="Save changes"
          type="submit"
          class="cursor-pointer w-fit lg:ms-auto"
        />
      </UPageCard>
      <UPageCard>
        <UFormField
          label="密钥"
          description="Used to sign in, for email receipts and product updates."
          class="flex max-sm:flex-col justify-between items-start gap-4"
        >
          <UInput
            v-model="asr.key"
            type="password"
          />
        </UFormField>
      </UPageCard>
    </UForm>
  </UCard>
</template>
