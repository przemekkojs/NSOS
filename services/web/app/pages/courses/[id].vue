<script setup lang="ts">
import { useCourse } from "~/composables/api/useCourses";
import { useRoute } from "@typed-router";
const route = useRoute("courses-id");

const id = Number(route.params.id);

const { data, isFetching } = useCourse(id);
definePageMeta({
  permission: "teaching.view_course",
});
</script>
<template>
  <h1>Employee: {{ id }}</h1>
  <div v-if="isFetching">Loading...</div>
  <div v-else>
    <pre>{{ data }}</pre>
  </div>
</template>
