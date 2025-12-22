<script setup lang="ts">
import InviteUsersForm from "./InviteUsersForm.vue";

const open = defineModel<boolean>("open", {
  default: false,
});
</script>
<template>
  <UModal v-model:open="open">
    <UButton
      id="invite-employee-button"
      :label="$t('button.invite')"
      trailing-icon="i-lucide-user-plus"
    />
    <template #content>
      <InviteUsersForm @success="open = false" />
    </template>
  </UModal>
</template>
