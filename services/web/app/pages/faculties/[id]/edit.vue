<script setup lang="ts">
import FacultyForm from "~/features/university/forms/FacultyForm.vue";
import type { FacultyCreate } from "~/lib/api/schemas";

const router = useRouter();
// @ts-expect-error id exists here as well
const id = computed(() => Number(router.currentRoute.value.params.id));
const { isLoading, data } = useFaculty(id);
const { mutateAsync: update } = useUpdateFaculty();

async function onSubmit(data: FacultyCreate) {
  await update({
    id: id.value,
    data,
  });

  router.back();
}

definePageMeta({
  permission: "university.change_faculty",
});
</script>
<template>
  <FacultyForm
    v-if="!isLoading"
    :initial-data="data"
    is-edit
    @success="onSubmit"
    @cancel="$router.back()"
  />
</template>
