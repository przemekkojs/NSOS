<script setup lang="ts">
import { useAPIFetch } from '@/core/lib/sdk'
import type { Lecturer } from '@/core/types'
// import { useRouter } from 'vue-router'

const { data: rawData, isFetching } = useAPIFetch('/users?kind=lecturer').json<Lecturer[]>()
// const toast = useToast()
// const router = useRouter()
</script>
<template>
  <h1>Employee: {{ $route.params.id }}</h1>
  <div v-if="isFetching">Loading...</div>
  <div v-else>
    <pre>{{ rawData }}</pre>
  </div>
</template>
