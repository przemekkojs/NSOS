<script setup lang="ts">
import CourseForm from "~/features/teaching/forms/CourseForm.vue";
import { navigateTo } from "@typed-router";
import type { CourseCreate } from "~/lib/api/schemas";

const { mutateAsync: create } = useCreateCourse();

async function onSubmit(data: CourseCreate) {
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
  <CourseForm @success="onSubmit" @cancel="$router.back" />
</template>
