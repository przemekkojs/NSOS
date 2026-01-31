<script setup lang="ts">
import UniversityForm from "~/features/university/forms/UniversityForm.vue";
import type { UniversityCreate } from "~/lib/api/schemas";

const router = useRouter();
// @ts-expect-error id exists here as well
const id = computed(() => Number(router.currentRoute.value.params.id));
const { isLoading, data } = useCourse(id);
const { mutateAsync: update } = useUpdateCourse();

async function onSubmit(data: UniversityCreate) {
  await update({
    id: id.value,
    data,
  });

  router.back();
}

definePageMeta({
  permission: "university.change_university",
});
</script>
<template>
  <UniversityForm
    v-if="!isLoading"
    :initial-data="data"
    is-edit
    @success="onSubmit"
    @cancel="$router.back()"
  />
</template>
