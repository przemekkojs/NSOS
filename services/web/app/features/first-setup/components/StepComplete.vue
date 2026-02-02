<script setup lang="ts">
import { useOnboarding } from "../useOnboarding";

const { completeOnboarding, store } = useOnboarding();
</script>

<template>
  <div class="text-center py-8">
    <div class="mb-6">
      <UIcon
        name="lucide:check-circle"
        class="w-20 h-20 text-green-500 mx-auto"
      />
    </div>

    <h2 class="text-3xl font-bold mb-3">All Set!</h2>
    <p class="text-gray-600 mb-8 max-w-md mx-auto">
      Your university setup is complete. You can now start adding courses,
      employees, and managing your schedule.
    </p>

    <UButton size="lg" @click="completeOnboarding">
      Go to Dashboard
      <UIcon name="lucide:arrow-right" class="ml-2" />
    </UButton>
    <UButton seze="lg" @click="store.$reset()"> Reset tour </UButton>
  </div>
</template>
