<script setup lang="ts">
const { locale, locales, setLocale, defaultLocale } = useI18n();
</script>

<template>
  <ULocaleSelect
    :model-value="locale"
    :locales="Object.values(locales) as any"
    @update:model-value="setLocale(($event as 'pl' | 'en') || defaultLocale)"
  />
</template>
