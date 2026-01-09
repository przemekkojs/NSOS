<script setup lang="ts">
import {
  InstitutionCreateSchema,
  type InstitutionCreate,
} from "~/lib/api/schemas";

const { institution = {} } = defineProps<{
  institution?: Partial<InstitutionCreate>;
}>();

defineEmits<{
  (e: "success", institution: InstitutionCreate): void;
  (e: "cancel"): void;
}>();

const state = ref<Partial<InstitutionCreate>>({
  ...institution,
  name: "",
  code: "",
  address: "",
});
</script>
<template>
  <UForm
    :state
    :schema="InstitutionCreateSchema"
    class="space-y-2"
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
