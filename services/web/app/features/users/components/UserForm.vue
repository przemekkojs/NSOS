<script setup lang="ts">
import { createLecturerSchema, type CreateLecturerDto } from "../schemas";

const { initialValues = {} } = defineProps<{
  initialValues?: Partial<CreateLecturerDto>;
}>();

defineEmits<{
  (e: "success", credentials: CreateLecturerDto): void;
}>();

defineSlots<{
  leader: {
    state: Partial<CreateLecturerDto>;
  };
}>();

const state = ref<Partial<CreateLecturerDto>>({
  ...initialValues,
  email: "",
  avatar: undefined,
  faculty: "",
  position: "",
  status: "active",
});

const statusItems = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Retired", value: "retired" },
];
</script>
<template>
  <UForm
    :schema="createLecturerSchema"
    :state
    class="flex flex-col gap-4 max-w-lg"
    @submit.prevent="$emit('success', $event.data)"
  >
    <UFormField :label="$t('form.label.email')" name="email" required>
      <UInput
        id="email"
        v-model="state.email"
        type="email"
        :placeholder="$t('form.placeholder.email')"
      />
    </UFormField>
    <UFormField :label="$t('form.label.avatar')" name="avatar">
      <UFileUpload
        v-model="state.avatar"
        accept="image/*"
        class="cursor-pointer"
      />
    </UFormField>
    <UFormField :label="$t('form.label.faculty')" name="faculty" required>
      <UInput
        id="faculty"
        v-model="state.faculty"
        :placeholder="$t('form.placeholder.faculty')"
      />
    </UFormField>
    <UFormField :label="$t('form.label.position')" name="position" required>
      <UInput
        id="position"
        v-model="state.position"
        :placeholder="$t('form.placeholder.position')"
      />
    </UFormField>
    <UFormField :label="$t('form.label.status')" name="status" required>
      <USelect v-model="state.status" :items="statusItems" />
    </UFormField>

    <UButton
      type="submit"
      class="w-full mt-6 text-white text-center inline-block text-1xl font-bold"
    >
      {{ $t("button.update") }}
    </UButton>
  </UForm>
</template>
