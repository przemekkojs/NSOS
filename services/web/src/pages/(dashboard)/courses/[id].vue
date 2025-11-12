<script setup lang="ts">
import { useCourse } from '@/core/composables/useCourses'
const params = useRoute().params

const id = Number(params.id as string)

if (isNaN(id)) {
  throw new Error('Invalid course ID')
}

const { data, isFetching } = useCourse(Number(params.id as string))
// const toast = useToast()
// const router = useRouter()
</script>
<template>
  <h1>Employee: {{ $route.params.id }}</h1>
  <div v-if="isFetching">Loading...</div>
  <div v-else>
    <pre>{{ data }}</pre>
  </div>
</template>
