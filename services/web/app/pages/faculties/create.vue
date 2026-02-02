<script setup lang="ts">
import { navigateTo } from "@typed-router";
import type { FacultyCreate } from "~/lib/api/schemas";
import FacultyForm from "~/features/university/forms/FacultyForm.vue";

const { mutateAsync: create } = useCreateFaculty();

async function onSubmit(data: FacultyCreate) {
  const { id } = await create(data);
  navigateTo({
    name: "faculties-id",
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
  <FacultyForm @success="onSubmit" @cancel="$router.back()" />
</template>
