<script setup lang="ts">
import { useOnboarding } from "~/features/first-setup/useOnboarding";

const { store, resumeOnboarding } = useOnboarding();
const dismissed = ref(false);

const dismiss = () => {
  dismissed.value = true;
};
</script>

<template>
  <div
    v-if="store.canResume && !dismissed"
    class="bg-blue-50 border-l-4 border-blue-500 p-4"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <UIcon name="lucide:info" class="text-blue-500 w-5 h-5" />
        <div>
          <p class="font-medium text-blue-900">Continue your setup</p>
          <p class="text-sm text-blue-700">
            You have an incomplete onboarding process
          </p>
        </div>
      </div>
      <div class="flex gap-2">
        <UButton variant="ghost" size="sm" @click="dismiss"> Dismiss </UButton>
        <UButton size="sm" @click="resumeOnboarding"> Resume </UButton>
      </div>
    </div>
  </div>
</template>
