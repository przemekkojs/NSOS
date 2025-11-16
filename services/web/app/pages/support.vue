<script setup lang="ts">
const toursStore = useUserToursStore();
const inviteTour = useTour();
const userStore = useUserStore();
</script>
<template>
  <h1>Support</h1>
  <UButton
    v-if="userStore.hasPermission('users.add_lecturer')"
    :disabled="toursStore.onboardingCompleted"
    @click="inviteTour.drive()"
  >
    Invite Users Tour
  </UButton>
  <UTooltip v-if="isDev" :text="$t('dev.resetTours')">
    <UButton class="w-min cursor-pointer" @click="toursStore.$reset()">
      {{ $t("button.reset") }}
    </UButton>
  </UTooltip>
</template>
