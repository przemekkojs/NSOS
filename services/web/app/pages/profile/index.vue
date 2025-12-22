<script setup lang="ts">
const userStore = useUserStore();

definePageMeta({
  permission: "users.view_user",
});
</script>
<template>
  <h1>Profil</h1>

  <p>Witaj w swoim profilu!</p>

  <pre>
    {{ userStore.$state }}
  </pre>
</template>
