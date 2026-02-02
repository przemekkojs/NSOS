<script setup lang="ts">
import UniversityForm from "~/features/university/forms/UniversityForm.vue";
import { useCreateUniversity } from "~/composables/api/useUniversities";
import type { UniversityCreate } from "~/lib/api/schemas";

const { mutate } = useCreateUniversity();
const open = ref(false);
const toast = useToast();

function onCreate(value: UniversityCreate) {
  open.value = false;
  toast.add({
    title: "University created",
    description: `University ${value.name} has been created successfully.`,
    color: "success",
  });

  mutate(value);
}
</script>
<template>
  <UModal
    v-model:open="open"
    :title="$t('page.university.create.title')"
    :description="$t('page.university.create.description')"
  >
    <UButton>{{ $t("button.create") }}</UButton>
    <template #body>
      <UniversityForm @success="onCreate" @cancel="open = false" />
    </template>
  </UModal>
</template>
