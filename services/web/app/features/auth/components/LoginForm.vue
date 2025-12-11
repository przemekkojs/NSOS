<script setup lang="ts">
import PasswordField from "~/components/ui/PasswordField.vue";
import { loginFormSchema, type LoginDto } from "../schemas";

defineEmits<{
  (e: "success", credentials: LoginDto): void;
}>();

const state = ref<Partial<LoginDto>>({
  email: "",
  password: "",
});
</script>
<template>
  <UForm
    :schema="loginFormSchema"
    :state
    class="flex flex-col gap-4"
    @submit.prevent="$emit('success', $event.data)"
  >
    <UFormField :label="$t('form.label.email')" name="email" required>
      <UInput
        v-model="state.email"
        type="email"
        :placeholder="$t('form.placeholder.email')"
      />
    </UFormField>
    <PasswordField v-model="state.password" />

    <UButton
      type="submit"
      class="w-full mt-6 text-white text-center inline-block text-1xl font-bold"
    >
      {{ $t("button.login") }}
    </UButton>
  </UForm>
</template>
