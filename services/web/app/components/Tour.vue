<script setup lang="ts">
defineSlots<{
  trigger(): void;
}>();
</script>
<template>
  <div>
    <slot name="trigger" />
  </div>
</template>
