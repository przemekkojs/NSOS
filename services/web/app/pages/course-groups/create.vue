<script setup lang="ts">
import CourseGroupForm from "~/features/teaching/forms/CourseGroupForm.vue";
import { navigateTo } from "@typed-router";
import type { CourseGroupCreate } from "~/lib/api/schemas";

const { mutateAsync: create } = useCreateCourseGroup();

async function onSubmit(data: CourseGroupCreate) {
  const { id } = await create(data);
  await navigateTo({
    name: "courses-id",
    params: {
      id,
    },
  });
}

definePageMeta({
  permission: "teaching.add_course",
});
</script>
<template>
  <CourseGroupForm @success="onSubmit" @cancel="$router.back" />
</template>
