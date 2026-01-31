<script setup lang="ts">
import PositionForm from "~/features/university/forms/PositionForm.vue";
import { useRouter } from "@typed-router";
import type { PositionCreate } from "~/lib/api/schemas";

const router = useRouter();

// @ts-expect-error id exists i promise
const id = computed(() => router.currentRoute.value.params.id);
const { isLoading, data } = usePosition(id);
const { mutateAsync: update } = useUpdatePosition();

async function onSubmit(data: PositionCreate) {
  await update({
    id: id.value,
    data,
  });

  router.back();
}

definePageMeta({
  permission: "university.change_position",
});
</script>
<template>
  <PositionForm
    v-if="!isLoading"
    :initial-data="data"
    is-edit
    @success="onSubmit"
    @cancel="$router.back()"
  />
</template>
