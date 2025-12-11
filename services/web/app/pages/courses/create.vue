<script setup lang="ts">
import CourseForm from "~/components/forms/CourseForm.vue";

const { mutateAsync: create } = useCreateCourse();

// TODO: faculty is multiselect
definePageMeta({
  permission: "teaching.add_course",
});
</script>
<template>
  <CourseForm @submit="create" />
</template>
