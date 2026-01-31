<script setup lang="ts">
import { useCourse } from "~/composables/api/useCourses";

const router = useRouter();

// @ts-expect-error id exists again
const id = computed(() => router.currentRoute.value.params.id);

const { data, isFetching } = useCourse(id);
definePageMeta({
  permission: "teaching.view_course",
});
</script>
<template>
  <PermissionGuard permission="teaching.change_course">
    <div class="flex gap-2">
      <UButton :to="`/courses/${id}/edit`" :label="$t('button.edit')" />
    </div>
  </PermissionGuard>
  <h1>Employee: {{ id }}</h1>
  <div v-if="isFetching">Loading...</div>
  <div v-if="data">
    <pre>{{ data }}</pre>
    <p>{{ data.course_code }}</p>
    <p>{{ data.name }}</p>
    <p>{{ data.weekly_hours }}</p>
    <p>{{ data.weeks_count }}</p>
    <p>{{ data.ects }}</p>
    <p>{{ data.course_group }}</p>
    <p>{{ data.course_type }}</p>
    <p>{{ data.faculty }}</p>
  </div>
</template>
