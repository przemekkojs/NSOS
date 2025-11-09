<script setup lang="ts">
import { useAPIFetch } from '@/core/lib/sdk'
import type { Institution } from '@/mocks/fixtures'

const route = useRoute()

const { data: rawData, isFetching } = useAPIFetch(`/institutions/${route.params.id}`).json<
  Institution[]
>()
</script>
<template>
  <h1>Institutions {{ $route.params.id }}</h1>
  <div v-if="isFetching">Loading...</div>
  <div v-else>
    <pre>{{ rawData }}</pre>
  </div>
</template>
