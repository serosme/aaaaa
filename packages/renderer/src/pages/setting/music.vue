<script setup lang="ts">
import { ref } from 'vue'

const musicLibraryPath = ref('')
</script>

<route lang="yaml">
meta:
  layout: setting
</route>

<template>
  <UCard>
    <UForm>
      <UPageCard
        title="Profile"
        description="These informations will be displayed publicly."
        variant="naked"
        orientation="horizontal"
        class="mb-4"
      >
        <UButton
          form="settings"
          label="Save changes"
          color="neutral"
          type="submit"
          class="w-fit lg:ms-auto"
        />
      </UPageCard>
      <UPageCard>
        <UFormField
          label="音乐库位置"
          description="Will appear on receipts, invoices, and other communication."
          required
          class="flex max-sm:flex-col justify-between items-start gap-4"
        >
          <UInput
            autocomplete="off"
          />
        </UFormField>
        <USeparator />
        <UFormField
          label="密钥"
          description="Used to sign in, for email receipts and product updates."
          required
          class="flex max-sm:flex-col justify-between items-start gap-4"
        >
          <UInput
            type="email"
            autocomplete="off"
          />
        </UFormField>
      </UPageCard>
    </UForm>
  </UCard>
</template>
