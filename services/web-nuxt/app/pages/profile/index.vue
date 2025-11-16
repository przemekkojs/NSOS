<script setup lang="ts">
const userStore = useUserStore();
</script>
<template>
  <h1>Profil</h1>

  <p>Witaj w swoim profilu!</p>

  <pre>
    {{ userStore.$state }}
  </pre>
</template>
