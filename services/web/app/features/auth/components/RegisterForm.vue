<script setup lang="ts">
import PasswordField from "~/components/ui/PasswordField.vue";
import { registerFormSchema, type RegisterDto } from "../schemas";

defineEmits<{
  (e: "success", credentials: RegisterDto): void;
}>();

const state = ref<Partial<RegisterDto>>({
  email: "",
  password: "",
  confirmPassword: "",
});
</script>
<template>
  <UForm
    :schema="registerFormSchema"
    :state="state"
    class="flex flex-col gap-4"
    @submit="$emit('success', state as RegisterDto)"
  >
    <UFormField :label="$t('form.label.email')" name="email" required>
      <UInput
        v-model="state.email"
        class="w-full"
        type="email"
        :placeholder="$t('form.placeholder.email')"
      />
    </UFormField>
    <PasswordField v-model="state.password" />
    <PasswordField
      v-model="state.confirmPassword"
      :label="$t('form.label.confirmPassword')"
      :placeholder="$t('form.label.confirmPassword')"
      name="confirm-password"
    />

    <UButton
      type="submit"
      class="w-full mt-6 text-white text-center inline-block text-1xl font-bold"
    >
      {{ $t("button.register") }}
    </UButton>
  </UForm>
</template>
