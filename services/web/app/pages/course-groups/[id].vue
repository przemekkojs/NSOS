<script setup lang="ts">
import { useRoute } from "@typed-router";

const router = useRoute("course-groups-id");

const id = Number(router.params.id);

definePageMeta({
  permission: "teaching.view_coursegroup",
});
</script>
<template>
  <p>Course groups</p>
</template>
