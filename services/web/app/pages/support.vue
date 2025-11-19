<script setup lang="ts">
const toursStore = useUserToursStore();
const inviteTour = useTour();
</script>
<template>
  <PermissionGuard permission="users.add_user">
    <UButton @click="inviteTour.drive()">{{
      $t("tours.inviteUsers.title")
    }}</UButton>
  </PermissionGuard>
  <DevOnly>
    <UTooltip :text="$t('dev.resetTours')">
      <UButton class="w-min cursor-pointer" @click="toursStore.$reset()">
        {{ $t("button.reset") }}
      </UButton>
    </UTooltip>
  </DevOnly>
</template>
