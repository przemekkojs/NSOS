<script setup lang="ts">
import { en, pl } from '@nuxt/ui/locale'
import { useI18n } from 'vue-i18n'

const locales = [en, pl]

const { locale } = useI18n()
</script>

<template>
  <ULocaleSelect v-model="locale" :locales />
</template>
