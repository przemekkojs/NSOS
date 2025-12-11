<script setup lang="ts">
import type { Locale } from "@intlify/core-base";
import type { Locale as NLocale } from "@nuxt/ui";

const { locale, locales, setLocale, defaultLocale } = useI18n();
</script>

<template>
  <ULocaleSelect
    :model-value="locale"
    :locales="Object.values(locales) as NLocale<Locale>[]"
    @update:model-value="setLocale(($event as Locale) || defaultLocale)"
  />
</template>
