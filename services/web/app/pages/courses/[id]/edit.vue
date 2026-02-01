<script setup lang="ts">
import CourseForm from "~/features/teaching/forms/CourseForm.vue";
import type { CourseCreate } from "~/lib/api/schemas";

const router = useRouter();
// @ts-expect-error id exists here as well
const id = computed(() => Number(router.currentRoute.value.params.id));
const { isLoading, data } = useCourse(id);
const { mutateAsync: update } = useUpdateCourse();

async function onSubmit(data: CourseCreate) {
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
  <CourseForm
    v-if="!isLoading"
    :initial-data="data"
    is-edit
    @success="onSubmit"
    @cancel="$router.back()"
  />
</template>
