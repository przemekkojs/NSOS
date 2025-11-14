<script setup lang="ts">
import type { Credentials } from "@/api/modules/auth";
import { useLogin } from "~/composables/useAuth";
import LoginForm from "~/features/auth/components/LoginForm.vue";
import { useUserStore } from "~/stores/user-store";

useHead({
  title: "Login",
});
definePageMeta({
  layout: "auth",
});

const { mutateAsync: login } = useLogin();
const userStore = useUserStore();
const navigateTo = useNavigateTo();

async function onSuccess(credentials: Credentials) {
  const user = await login(credentials);
  userStore.$patch(user);

  await navigateTo({ name: "index" });
}
</script>
<template>
  <div class="mx-auto w-full md:max-w-[480px] p-4 sm:p-8">
    <h1 class="text-4xl mb-4 text-center">{{ $t("page.login.title") }}</h1>
    <LoginForm @success="onSuccess" />
  </div>
</template>
