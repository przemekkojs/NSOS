<script setup lang="ts">
import UniversityForm from "~/features/university/forms/UniversityForm.vue";
import { useCreateUniversity } from "~/composables/api/useUniversities";
import type { UniversityCreate } from "~/lib/api/schemas";

const { mutateAsync: create } = useCreateUniversity();
const toast = useToast();

async function onCreate(value: UniversityCreate) {
  const { id } = await create(value);
  toast.add({
    title: "University created",
    description: `University ${value.name} has been created successfully.`,
    color: "success",
  });

  navigateTo({
    name: "universities-id",
    params: {
      id,
    },
  });
}

definePageMeta({
  permission: "university.add_university",
});
</script>
<template>
  <UniversityForm @success="onCreate" @cancel="$router.back" />
</template>
