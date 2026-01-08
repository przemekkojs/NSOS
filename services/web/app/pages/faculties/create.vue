<script setup lang="ts">
import { navigateTo } from "@typed-router";
import type { FacultyCreate } from "~/lib/api/schemas";

const { mutateAsync: create } = useCreateFaculty();

async function onSubmit(data: FacultyCreate) {
  const { id } = await create(data);
  navigateTo({
    path: "/faculties/:id",
    params: {
      id,
    },
  });
}

definePageMeta({
  permission: "university.add_faculty",
});
</script>
<template>
  <FacultyForm @submit="onSubmit" />
</template>
