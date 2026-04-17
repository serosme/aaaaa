<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import type { AsrConf } from 'shared'

definePageMeta({
  layout: 'setting',
})

const toast = useToast()

const asrConf = reactive<AsrConf>({
  key: '',
})

onMounted(async () => {
  asrConf.key = (await $fetch<AsrConf>('/api/conf/asr')).key
})

async function onSubmit(event: FormSubmitEvent<AsrConf>) {
  const success = await $fetch<boolean>('/api/conf/asr', {
    method: 'post',
    body: toRaw(event.data),
  })
  if (success) {
    toast.add({
      title: '成功',
      color: 'success',
      duration: 1200,
    })
  }
}
</script>

<template>
  <UCard class="h-full">
    <UForm :state="asrConf" @submit="onSubmit">
      <UPageCard
        title="语音识别"
        variant="naked"
        orientation="horizontal"
        class="mb-4"
      >
        <UButton
          label="保存"
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
            v-model="asrConf.key"
            type="password"
          />
        </UFormField>
      </UPageCard>
    </UForm>
  </UCard>
</template>
