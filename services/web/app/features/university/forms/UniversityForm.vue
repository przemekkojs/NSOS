<script setup lang="ts">
import {
  UniversityCreateSchema,
  type UniversityCreate,
} from "~/lib/api/schemas";

const { initialData = {}, isEdit } = defineProps<{
  initialData?: Partial<UniversityCreate>;
  isEdit?: boolean;
}>();

defineEmits<{
  (e: "success", university: UniversityCreate): void;
  (e: "cancel"): void;
}>();

const state = ref<Partial<UniversityCreate>>({
  name: "",
  description: "",
  ...initialData,
});
</script>
<template>
  <UForm
    :state
    :schema="UniversityCreateSchema"
    class="space-y-2"
    @submit="$emit('success', $event.data)"
  >
    <UFormField :label="$t('form.label.name')" name="name" required>
      <UInput id="name" v-model="state.name" />
    </UFormField>
    <UFormField
      :label="$t('form.label.description')"
      name="description"
      required
    >
      <UInput id="code" v-model="state.description" />
    </UFormField>
    <div class="flex gap-2">
      <UButton type="submit">{{
        isEdit ? $t("button.edit") : $t("button.create")
      }}</UButton>
      <UButton @click="$emit('cancel')">{{ $t("button.cancel") }}</UButton>
    </div>
  </UForm>
</template>
