<script setup lang="ts">
import {
  type Faculty,
  type FacultyCreate,
  FacultyCreateSchema,
} from "~/lib/api/schemas";

const props = defineProps<{
  isEdit?: boolean;
  initialData?: Faculty;
}>();

defineEmits<{
  (e: "success", data: FacultyCreate): void;
  (e: "cancel"): void;
}>();

const state = ref<Partial<FacultyCreate>>({
  name: props.initialData?.name || "",
  description: props.initialData?.description || "",
});
</script>

<template>
  <UForm
    :schema="FacultyCreateSchema"
    :state="state"
    class="flex flex-col gap-4"
    @submit.prevent="$emit('success', $event.data)"
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

    <div class="flex gap-2 justify-end mt-4">
      <UButton
        type="button"
        color="neutral"
        variant="outline"
        @click="$emit('cancel')"
      >
        {{ $t("button.cancel") }}
      </UButton>
      <UButton type="submit" class="text-white">
        {{ isEdit ? $t("button.update") : $t("button.create") }}
      </UButton>
    </div>
  </UForm>
</template>
