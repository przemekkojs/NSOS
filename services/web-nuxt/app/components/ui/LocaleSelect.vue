<script setup lang="ts">
const { locale, locales, setLocale } = useI18n();
</script>

<template>
  <ULocaleSelect
    :model-value="locale"
    :locales="Object.values(locales)"
    @update:model-value="setLocale($event)"
  />
</template>
