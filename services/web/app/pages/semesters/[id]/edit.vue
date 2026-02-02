<script setup lang="ts">
import SemesterForm from "~/features/university/forms/SemesterForm.vue";
import type { SemesterCreate } from "~/lib/api/schemas";

const router = useRouter();
// @ts-expect-error id exists here as well
const id = computed(() => Number(router.currentRoute.value.params.id));
const { isLoading, data } = useSemester(id);
const { mutateAsync: update } = useUpdateSemester();

async function onSubmit(data: SemesterCreate) {
  await update({
    id: id.value,
    data,
  });
  router.back();
}

definePageMeta({
  permission: "university.change_semester",
});
</script>
<template>
  <SemesterForm
    v-if="!isLoading"
    :initial-data="data"
    is-edit
    @success="onSubmit"
    @cancel="$router.back()"
  />
</template>
