<script setup lang="ts">
import LoginForm from '@/features/auth/components/LoginForm.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

async function onSuccess() {
  await router.push({
    path: '/',
  })
}
</script>
<template>
  <div class="mx-auto mt-16 max-w-1/2">
    <h1 class="text-4xl mb-4 text-center">Log in to your account</h1>
    <LoginForm @success="onSuccess" />
  </div>
</template>
<style lang="css" scoped></style>
