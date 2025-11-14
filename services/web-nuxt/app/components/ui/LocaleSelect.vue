<script setup lang="ts">
const { locale, locales, setLocale, defaultLocale } = useI18n();
</script>

<template>
  <ULocaleSelect
    :model-value="locale"
    :locales="Object.values(locales)"
    @update:model-value="setLocale(($event as 'pl' | 'en') || defaultLocale)"
  />
</template>
