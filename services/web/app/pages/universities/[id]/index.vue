<script setup lang="ts">
import { useUniversity } from "~/composables/api/useUniversities";

const router = useRouter();
// @ts-expect-error this is fine i promise
const id = computed(() => router.currentRoute.value.params.id);

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
