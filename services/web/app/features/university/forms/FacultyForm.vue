<script setup lang="ts">
import {
  type Faculty,
  type FacultyCreate,
  FacultyCreateSchema,
} from "~/lib/api/schemas";

const props = defineProps<{
  isEdit?: boolean;
  initialData?: Partial<Faculty>;
}>();

defineEmits<{
  (e: "success", data: FacultyCreate): void;
  (e: "cancel"): void;
}>();

const state = ref<Partial<FacultyCreate>>({
  name: props.initialData?.name || "",
  description: props.initialData?.description || "",
  university: props.initialData?.university,
});
</script>

<template>
  <UForm
    :state
    :schema="FacultyCreateSchema"
    class="space-y-2"
    @submit="$emit('success', $event.data)"
  >
    <UFormField :label="$t('form.label.name')" name="name" required>
      <UInput
        v-model="state.name"
        class="w-full"
        :placeholder="$t('form.placeholder.facultyName')"
      />
    </UFormField>

    <UFormField :label="$t('form.label.description')" name="description">
      <UTextarea
        v-model="state.description"
        class="w-full"
        :placeholder="$t('form.placeholder.description')"
        :rows="10"
      />
    </UFormField>

    <div class="flex gap-2">
      <UButton type="submit">
        {{ isEdit ? $t("button.update") : $t("button.create") }}
      </UButton>
      <UButton color="neutral" variant="outline" @click="$emit('cancel')">
        {{ $t("button.cancel") }}
      </UButton>
    </div>
  </UForm>
</template>
