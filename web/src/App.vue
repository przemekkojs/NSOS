<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'

const i18n = useI18n()

const locale = computed(() => {
  return locales[i18n.locale as unknown as keyof typeof locales]
})
</script>
<template>
  <UApp :locale>
    <RouterView />
  </UApp>
</template>
