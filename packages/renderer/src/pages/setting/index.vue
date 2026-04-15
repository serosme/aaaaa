<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items: NavigationMenuItem[] = [
  {
    label: 'Home',
    icon: 'i-lucide-house',
    active: true,
  },
  {
    label: 'Music',
    icon: 'i-lucide-music',
    to: '/setting/music',
  },
]
</script>

<route lang="yaml">
meta:
  layout: setting
</route>

<template>
  <div class="flex flex-col flex-1">
    <UHeader title="Setting" :ui="{ container: 'px-4!' }" />

    <div class="flex flex-1 min-h-0">
      <USidebar
        collapsible="icon"
        :ui="{
          gap: 'h-[calc(100%-var(--ui-header-height))]',
          container:
            'absolute top-(--ui-header-height) bottom-0 h-[calc(100%-var(--ui-header-height))]',
        }"
      >
        <UNavigationMenu
          :items="items"
          orientation="vertical"
          :ui="{ link: 'p-1.5 overflow-hidden' }"
        />
      </USidebar>

      <div class="flex-1 p-4">
        <RouterView />
      </div>
    </div>
  </div>
</template>
