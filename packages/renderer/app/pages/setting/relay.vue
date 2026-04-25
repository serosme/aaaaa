<script setup lang="ts">
definePageMeta({
  layout: 'setting',
})

const toast = useToast()

const { conf, save } = useConf('relay')

async function onSubmit() {
  save()
  toast.add({
    title: '成功',
    color: 'success',
    duration: 1200,
  })
}
</script>

<template>
  <UCard class="h-full">
    <UForm :state="conf" @submit="onSubmit">
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
      <UPageCard
        v-for="(item, index) in conf"
        :key="index"
      >
        <UFormField
          label="标识"
          description="Used to sign in, for email receipts and product updates."
          class="flex max-sm:flex-col justify-between items-start gap-4"
        >
          <UInput
            v-model="item.key"
            type="text"
          />
        </UFormField>
        <UFormField
          label="脚本"
          description="Used to sign in, for email receipts and product updates."
          class="flex max-sm:flex-col justify-between items-start gap-4"
        >
          <UTextarea
            v-model="item.key"
          />
        </UFormField>
      </UPageCard>
    </UForm>
  </UCard>
</template>
