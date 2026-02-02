<script setup lang="ts">
import { navigateTo } from "@typed-router";
import type { PositionCreate } from "~/lib/api/schemas";
import PositionForm from "~/features/university/forms/PositionForm.vue";

const { mutateAsync: create } = useCreatePosition();

async function onSubmit(data: PositionCreate) {
  const { id } = await create(data);
  navigateTo({
    name: "positions-id",
    params: {
      id,
    },
  });
}

definePageMeta({
  permission: "university.add_position",
});
</script>
<template>
  <PositionForm @success="onSubmit" @cancel="$router.back()" />
</template>
