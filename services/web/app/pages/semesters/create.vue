<script setup lang="ts">
import { navigateTo } from "@typed-router";
import type { SemesterCreate } from "~/lib/api/schemas";
import SemesterForm from "~/features/university/forms/SemesterForm.vue";

const { mutateAsync: create } = useCreateSemester();

async function onSubmit(data: SemesterCreate) {
  const { id } = await create(data);
  navigateTo({
    name: "positions-id",
    params: {
      id,
    },
  });
}

definePageMeta({
  permission: "university.add_semester",
});
</script>
<template>
  <SemesterForm @success="onSubmit" @cancel="$router.back()" />
</template>
