<script setup lang="ts">
import { useUniversity } from "~/composables/api/useUniversities";
import { useRoute } from "@typed-router";

const route = useRoute("universities-id");
const id = Number(route.params.id);

const { data, isFetching } = useUniversity(id);

definePageMeta({
  permission: "university.view_university",
});
</script>
<template>
  <h1>Universities {{ id }}</h1>
  <div v-if="isFetching">Loading...</div>
  <div v-else>
    <pre>{{ data }}</pre>
  </div>
</template>
