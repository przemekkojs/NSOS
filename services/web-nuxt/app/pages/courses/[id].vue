<script setup lang="ts">
import { useCourse } from "~/composables/useCourses";
import { useRoute } from "@typed-router";
const route = useRoute("courses-id");

const id = Number(route.params.id);

const { data, isFetching } = useCourse(id);
// const toast = useToast()
// const router = useRouter()
</script>
<template>
  <h1>Employee: {{ id }}</h1>
  <div v-if="isFetching">Loading...</div>
  <div v-else>
    <pre>{{ data }}</pre>
  </div>
</template>
