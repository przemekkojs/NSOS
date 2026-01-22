<script setup lang="ts">
import type { Credentials } from "~/lib/api/modules/auth";
import { useRegister } from "~/composables/api/useAuth";
import { useUserStore } from "~/stores/user";
import RegisterForm from "~/features/auth/components/RegisterForm.vue";

useHead({
  title: "Register",
});
definePageMeta({
  layout: "auth",
  auth: false,
});

const { mutateAsync: register } = useRegister();
const userStore = useUserStore();
const navigateTo = useNavigateTo();

async function onSuccess(credentials: Credentials) {
  const user = await register(credentials);

  // TODO: replace this with email confirmation but it's enough for now
  userStore.setUser(user);

  await navigateTo({ name: "index" });
}
</script>
<template>
  <div class="mx-auto mt-16 max-w-1/2">
    <h1 class="text-4xl mb-4 text-center">{{ $t("page.register.title") }}</h1>
    <RegisterForm @success="onSuccess" />
  </div>
</template>
