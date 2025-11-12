<!-- eslint-disable no-restricted-imports because type-check -->
<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'
import { useHead } from '@unhead/vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()

const locale = computed(() => {
  return locales[i18n.locale as unknown as keyof typeof locales]
})

const code = computed(() => i18n.locale.value)

useHead({
  title: 'NSOS',
  titleTemplate: '%s - NSOS',
  htmlAttrs: {
    lang: i18n.locale,
  },
})
</script>
<template>
  <UApp :locale :key="code">
    <RouterView />
  </UApp>
</template>
