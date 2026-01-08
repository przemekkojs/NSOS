<script setup lang="ts">
import InstitutionForm from "~/features/institutions/components/InstitutionForm.vue";
import { useCreateInstitution } from "~/composables/api/useInstitutions";
import type { InstitutionCreate } from "~/lib/api/schemas";

const { mutate } = useCreateInstitution();
const open = ref(false);
const toast = useToast();

function onCreate(value: InstitutionCreate) {
  open.value = false;
  toast.add({
    title: "Institution created",
    description: `Institution ${value.name} has been created successfully.`,
    color: "success",
  });

  mutate(value);
}
</script>
<template>
  <UModal
    v-model:open="open"
    :title="$t('page.institution.create.title')"
    :description="$t('page.institution.create.description')"
  >
    <UButton>{{ $t("button.create") }}</UButton>
    <template #body>
      <InstitutionForm @success="onCreate" @cancel="open = false" />
    </template>
  </UModal>
</template>
