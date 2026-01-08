<script setup lang="ts">
import { useLogin } from "~/composables/api/useAuth";
import LoginForm from "~/features/auth/components/LoginForm.vue";

useHead({
  title: "Login",
});
definePageMeta({
  layout: "auth",
  auth: false,
});

const { mutateAsync: login } = useLogin();
</script>
<template>
  <div class="mx-auto w-full md:max-w-[480px] p-4 sm:p-8">
    <h1 class="text-4xl mb-4 text-center">{{ $t("page.login.title") }}</h1>
    <LoginForm @success="login" />
  </div>
</template>
