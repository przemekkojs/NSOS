<script setup lang="ts">
import FirstSetupForm from "./FirstSetupForm.vue";

const isFirstSetup = useLocalStorage<boolean>("first-setup", true);
</script>
<template>
  <UModal :close="false" :dismissible="false" :open="isFirstSetup">
    <template #body>
      <FirstSetupForm />
    </template>
  </UModal>
</template>
