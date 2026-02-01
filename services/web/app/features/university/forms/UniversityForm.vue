<script setup lang="ts">
import {
  UniversityCreateSchema,
  type UniversityCreate,
} from "~/lib/api/schemas";

const { university = {} } = defineProps<{
  university?: Partial<UniversityCreate>;
}>();

defineEmits<{
  (e: "success", university: UniversityCreate): void;
  (e: "cancel"): void;
}>();

const state = ref<Partial<UniversityCreate>>({
  ...university,
  name: "",
  description: "",
});
</script>
<template>
  <UForm
    :state
    :schema="UniversityCreateSchema"
    class="space-y-2"
    @submit.prevent="$emit('success', $event.data)"
    @error="console.error"
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
      <UButton type="submit">{{ $t("button.create") }}</UButton>
      <UButton @click="$emit('cancel')">{{ $t("button.cancel") }}</UButton>
    </div>
  </UForm>
</template>
