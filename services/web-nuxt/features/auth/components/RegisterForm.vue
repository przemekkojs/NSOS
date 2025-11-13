<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import PasswordField from "~/components/ui/PasswordField.vue";

import z from "zod";

const loginFormSchema = z
  .object({
    email: z.email(),
    password: z.string(), // FIXME: refine for client side validation also
    confirmPassword: z.string(),
  })
  .refine(
    ({ password, confirmPassword }) => password === confirmPassword,
    "Passwords do not match"
  );

type LoginSchema = z.output<typeof loginFormSchema>;

const emit = defineEmits<{
  (e: "success", credentials: LoginSchema): void;
}>();

const state = ref<Partial<LoginSchema>>({
  email: "",
  password: "",
});

async function onSubmit(event: FormSubmitEvent<LoginSchema>) {
  emit("success", event.data);
}
</script>
<template>
  <UForm
    data-testid="register-form"
    :schema="loginFormSchema"
    :state
    class="flex flex-col gap-4"
    @submit="onSubmit"
  >
    <UFormField :label="$t('form.label.email')" name="email" required>
      <UInput
        id="email"
        v-model="state.email"
        class="w-full"
        type="email"
        data-testid="email-input"
        :placeholder="$t('form.placeholder.email')"
      />
    </UFormField>
    <PasswordField
      id="password"
      v-model="state.password"
      data-testid="password-input"
    />
    <PasswordField
      id="confirm-password"
      v-model="state.confirmPassword"
      :label="$t('form.label.confirmPassword')"
      name="confirm-password"
      data-testid="confirm-password-input"
    />

    <UButton
      type="submit"
      data-testid="register-submit"
      class="w-full mt-6 text-white text-center inline-block text-1xl font-bold"
    >
      {{ $t("button.register") }}
    </UButton>
  </UForm>
</template>
