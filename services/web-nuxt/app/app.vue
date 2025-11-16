<script setup lang="ts">
import { onErrorCaptured } from "vue";

if (import.meta.client) {
  const originalSetAttribute = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function (name, value) {
    if (
      typeof value === "string" &&
      (/[\n\r]/.test(value) || value.includes("\u0000"))
    ) {
      console.error("Invalid attribute detected:", name, value);
      debugger; // This will pause execution
    }
    return originalSetAttribute.call(this, name, value);
  };
}
</script>
<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
