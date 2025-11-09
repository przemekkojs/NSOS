<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'
</script>
<template>
  <UApp :locale="locales[$i18n.locale]">
    <RouterView />
  </UApp>
</template>
