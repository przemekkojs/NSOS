<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import PasswordField from '@/core/components/ui/PasswordField.vue'

import z from 'zod'

const loginFormSchema = z.object({
  email: z.email(),
  password: z.string(), // FIXME: refine for client side validation also
})

type LoginSchema = z.output<typeof loginFormSchema>

const emit = defineEmits<{
  (e: 'success', credentials: LoginSchema): void
}>()

const state = ref<Partial<LoginSchema>>({
  email: '',
  password: '',
})

async function onSubmit(event: FormSubmitEvent<LoginSchema>) {
  emit('success', event.data)
}
</script>
<template>
  <UForm
    data-testid="login-form"
    :schema="loginFormSchema"
    :state
    @submit="onSubmit"
    class="flex flex-col gap-4"
  >
    <UFormField :label="$t('form.label.email')" name="email" required>
      <UInput
        id="email"
        v-model="state.email"
        class="w-full"
        data-testid="email-input"
        :placeholder="$t('form.placeholder.email')"
      />
    </UFormField>
    <PasswordField v-model="state.password" data-testid="password-input" id="password" />

    <UButton
      type="submit"
      class="w-full mt-6 text-white text-center inline-block text-1xl font-bold"
      data-testid="login-submit"
    >
      {{ $t('button.login') }}
    </UButton>
  </UForm>
</template>
