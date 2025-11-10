<script setup lang="ts">
import { useInstitution } from '@/core/composables/useInstitutions'

const params = useRoute().params
const id = ref(Number(params.id as string))

const { data, isFetching } = useInstitution(id)
</script>
<template>
  <h1>Institutions {{ $route.params.id }}</h1>
  <div v-if="isFetching">Loading...</div>
  <div v-else>
    <pre>{{ data }}</pre>
  </div>
</template>
