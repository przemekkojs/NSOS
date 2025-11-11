<script setup lang="ts">
import type { Credentials } from '@/api/modules/auth'
import { useLogin } from '@/core/composables/useAuth'
import LoginForm from '@/features/auth/components/LoginForm.vue'
import { useUserStore } from '@/features/auth/stores/user-store'

const router = useRouter()

useHead({
  title: 'Login',
})

const { mutateAsync: login } = useLogin()
const userStore = useUserStore()
async function onSuccess(credentials: Credentials) {
  const user = await login(credentials)
  userStore.$patch(user)

  await router.push({
    path: '/',
  })
}
</script>
<template>
  <div class="mx-auto mt-16 max-w-1/2">
    <h1 class="text-4xl mb-4 text-center">{{ $t('page.login.title') }}</h1>
    <LoginForm @success="onSuccess" />
  </div>
</template>
