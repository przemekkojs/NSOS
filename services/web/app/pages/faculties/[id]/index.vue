<script setup lang="ts">
import { useRoute } from "@typed-router";

const params = useRoute("faculties-id").params;

const id = Number(params.id);

definePageMeta({
  permission: "university.view_faculty",
});
</script>
<template>
  <p>Faculty with {{ id }}</p>
</template>
