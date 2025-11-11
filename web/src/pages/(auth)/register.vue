<script setup lang="ts">
import type { Credentials } from '@/api/modules/auth'
import { useRegister } from '@/core/composables/useAuth'
import { useUserStore } from '@/features/auth/stores/user-store'
import RegisterForm from '@/features/auth/components/RegisterForm.vue'

const router = useRouter()

useHead({
  title: 'Register',
})

const { mutateAsync: register } = useRegister()
const userStore = useUserStore()
async function onSuccess(credentials: Credentials) {
  const user = await register(credentials)

  // TODO: replace this with email confirmation but it's enough for now
  userStore.$patch(user)

  await router.push({
    path: '/',
  })
}
</script>
<template>
  <div class="mx-auto mt-16 max-w-1/2">
    <h1 class="text-4xl mb-4 text-center">{{ $t('page.register.title') }}</h1>
    <RegisterForm @success="onSuccess" />
  </div>
</template>
