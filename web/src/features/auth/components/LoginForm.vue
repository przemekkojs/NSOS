<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import PasswordField from '@/core/components/ui/PasswordField.vue'

import z from 'zod'
import { useAuth } from '@/core/lib/sdk'
import { useUserStore } from '../stores/user-store'

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

const userStore = useUserStore()
const auth = useAuth()

async function onSubmit(event: FormSubmitEvent<LoginSchema>) {
  const data = await auth.login(event.data)
  userStore.$patch(data)
  emit('success', event.data)
}
</script>
<template>
  <UForm :schema="loginFormSchema"
:state
@submit="onSubmit"
class="flex flex-col gap-4">
    <UFormField label="Email" name="email" required>
      <UInput v-model="state.email" class="w-full" />
    </UFormField>
    <PasswordField v-model="state.password" />

    <UButton
      type="submit"
      class="w-full mt-6 text-white text-center inline-block text-1xl font-bold"
    >
      Login
    </UButton>
  </UForm>
</template>
