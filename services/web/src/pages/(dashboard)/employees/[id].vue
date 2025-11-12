<script setup lang="ts">
import { useUsers } from '@/core/composables/useUsers'

const { data, isFetching } = useUsers()
</script>
<template>
  <h1>Employee: {{ $route.params.id }}</h1>
  <div v-if="isFetching">Loading...</div>
  <div v-else>
    <pre>{{ data }}</pre>
  </div>
</template>
