<script setup lang="ts">
import { useInstitution } from '@/core/composables/useInstitutions'

const route = useRoute('/(dashboard)/institutions/[id]')
const id = Number(route.params.id)

const { data, isFetching } = useInstitution(id)
</script>
<template>
  <h1>Institutions {{ id }}</h1>
  <div v-if="isFetching">Loading...</div>
  <div v-else>
    <pre>{{ data }}</pre>
  </div>
</template>
