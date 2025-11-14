<script setup lang="ts">
import {
  createInstitutionSchema,
  type CreateInstitutionDto,
} from "~/features/institutions/schemas";

defineEmits<{
  (e: "success", institution: CreateInstitutionDto): void;
  (e: "cancel"): void;
}>();

const state = ref<Partial<CreateInstitutionDto>>({
  name: "",
  code: "",
  address: "",
});
</script>
<template>
  <UForm
    :state
    :schema="createInstitutionSchema"
    class="space-y-2"
    data-testid="create-institution-form"
    @submit.prevent="$emit('success', $event.data)"
    @error="console.error"
  >
    <UFormField :label="$t('form.label.institutionName')" name="name" required>
      <UInput id="name" v-model="state.name" />
    </UFormField>
    <UFormField :label="$t('form.label.institutionCode')" name="code" required>
      <UInput id="code" v-model="state.code" />
    </UFormField>
    <UFormField :label="$t('form.label.institutionAddress')" name="address">
      <UInput id="address" v-model="state.address" />
    </UFormField>
    <div class="flex gap-2">
      <UButton type="submit">{{ $t("button.create") }}</UButton>
      <UButton @click="$emit('cancel')">{{ $t("button.cancel") }}</UButton>
    </div>
  </UForm>
</template>
