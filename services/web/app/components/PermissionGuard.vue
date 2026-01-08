<script setup lang="ts">
import type { Permission } from "~/lib/api/schemas";
const { permission = undefined } = defineProps<{
  permission?: Permission;
}>();

defineSlots<{
  default(): void;
}>();

const user = useUserStore();
</script>
<template>
  <slot v-if="!permission || user.hasPermission(permission)" />
</template>
