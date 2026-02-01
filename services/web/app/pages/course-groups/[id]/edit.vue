<script setup lang="ts">
import CourseGroupForm from "~/features/teaching/forms/CourseGroupForm.vue";
import type { CourseGroupCreate } from "~/lib/api/schemas";

const router = useRouter();
// @ts-expect-error id exists here as well
const id = computed(() => Number(router.currentRoute.value.params.id));
const { isLoading, data } = useCourseGroup(id);
const { mutateAsync: update } = useUpdateCourseGroup();

async function onSubmit(data: CourseGroupCreate) {
  await update({
    id: id.value,
    data,
  });

  router.back();
}

definePageMeta({
  permission: "teaching.change_course",
});
</script>
<template>
  <CourseGroupForm
    v-if="!isLoading"
    :initial-data="data"
    is-edit
    @success="onSubmit"
    @cancel="$router.back()"
  />
</template>
