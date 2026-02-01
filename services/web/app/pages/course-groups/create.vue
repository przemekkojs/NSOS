<script setup lang="ts">
import CourseGroupForm from "~/features/teaching/forms/CourseGroupForm.vue";
import type { CourseGroupCreate } from "~/lib/api/schemas";

const { mutateAsync: create } = useCreateCourseGroup();
const navigateTo = useNavigateTo();

async function onSubmit(data: CourseGroupCreate) {
  const { id } = await create(data);
  console.log(`create ${id}`);
  navigateTo({
    name: "course-groups-id",
    params: {
      id,
    },
  });
}

definePageMeta({
  permission: "teaching.add_coursegroup",
});
</script>
<template>
  <CourseGroupForm @success="onSubmit" @cancel="$router.back" />
</template>
