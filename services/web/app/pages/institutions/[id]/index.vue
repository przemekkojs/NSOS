<script setup lang="ts">
import { useInstitution } from "~/composables/api/useInstitutions";
import { useRoute } from "@typed-router";

const route = useRoute("institutions-id");
const id = Number(route.params.id);

const { data, isFetching } = useInstitution(id);

definePageMeta({
  // @ts-expect-error change when institution backend is added
  permission: "university.view_institution",
});
</script>
<template>
  <h1>Institutions {{ id }}</h1>
  <div v-if="isFetching">Loading...</div>
  <div v-else>
    <pre>{{ data }}</pre>
  </div>
</template>
