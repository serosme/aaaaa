<script setup lang="ts">
import { ref } from 'vue'

const musicLibraryPath = ref('')
</script>

<route lang="yaml">
meta:
  layout: setting
</route>

<template>
  <UCard class="h-full">
    <UForm>
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
          <UInput />
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
