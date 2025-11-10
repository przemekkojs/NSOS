<script setup lang="ts">
import { useA11yStore } from '@/features/a11y/stores/a11y-store'

const a11y = useA11yStore()
const items = [
  { label: '75%', value: 750 },
  { label: '100%', value: 1000 },
  { label: '125%', value: 1250 },
  { label: '150%', value: 1500 },
]
</script>
<template>
  <pre>
    {{ a11y }}
  </pre>
  <USelect v-model="a11y.fontScale" :items="items" />
</template>
