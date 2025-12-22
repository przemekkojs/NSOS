<script setup lang="ts">
import { type UserCreate, UserCreateSchema } from "~/lib/api/schemas";

const { initialValues = {} } = defineProps<{
  initialValues?: Partial<UserCreate>;
}>();

defineEmits<{
  (e: "submit", data: UserCreate): void;
}>();

const state = ref<Partial<UserCreate>>({
  email: "",
  ...initialValues,
});

watch(
  () => initialValues,
  (newValues) => {
    if (newValues && Object.keys(newValues).length > 0) {
      state.value = {
        ...state.value,
        ...newValues,
      };
    }
  },
  { immediate: true, deep: true }
);

const { isEnabled } = useFeatureFlagsStore();

const statusItems = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Retired", value: "retired" },
];
</script>
<template>
  <UForm
    :schema="UserCreateSchema"
    :state
    class="flex flex-col gap-4 max-w-lg"
    @submit.prevent="$emit('submit', $event.data)"
  >
    <UFormField :label="$t('form.label.email')" name="email" required>
      <UInput
        id="email"
        v-model="state.email"
        type="email"
        :placeholder="$t('form.placeholder.email')"
      />
    </UFormField>
    <UFormField :label="$t('form.label.firstName')" name="first-name" required>
      <UInput
        id="first-name"
        v-model="state.first_name"
        :placeholder="$t('form.placeholder.firstName')"
      />
    </UFormField>
    <UFormField :label="$t('form.label.lastName')" name="last-name" required>
      <UInput
        id="last-name"
        v-model="state.last_name"
        :placeholder="$t('form.placeholder.lastName')"
      />
    </UFormField>
    <UFormField
      v-if="isEnabled('userAvatars')"
      :label="$t('form.label.avatar')"
      name="avatar"
    >
      <!-- TODO: add state.avatar when feature is implemented -->
      <UFileUpload accept="image/*" class="cursor-pointer" />
    </UFormField>
    <UFormField
      v-if="isLecturer(state)"
      :label="$t('form.label.faculty')"
      name="faculty"
      required
    >
      <UInput
        id="faculty"
        v-model="state.faculty"
        :placeholder="$t('form.placeholder.faculty')"
      />
    </UFormField>
    <UFormField
      v-if="isLecturer(state)"
      :label="$t('form.label.position')"
      name="position"
      required
    >
      <UInput
        id="position"
        v-model="state.position"
        :placeholder="$t('form.placeholder.position')"
      />
    </UFormField>
    <UFormField
      v-if="isLecturer(state)"
      :label="$t('form.label.status')"
      name="status"
      required
    >
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
