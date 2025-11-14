<script setup lang="ts">
import PasswordField from "~/components/ui/PasswordField.vue";

import z from "zod";

const loginFormSchema = z.object({
  email: z.email(),
  password: z.string(), // FIXME: refine for client side validation also
});

type LoginSchema = z.output<typeof loginFormSchema>;

defineEmits<{
  (e: "success", credentials: LoginSchema): void;
}>();

const state = ref<Partial<LoginSchema>>({
  email: "",
  password: "",
});
</script>
<template>
  <UForm
    data-testid="login-form"
    :schema="loginFormSchema"
    :state
    class="flex flex-col gap-4"
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
    <PasswordField id="password" v-model="state.password" />

    <UButton
      type="submit"
      class="w-full mt-6 text-white text-center inline-block text-1xl font-bold"
    >
      {{ $t("button.login") }}
    </UButton>
  </UForm>
</template>
