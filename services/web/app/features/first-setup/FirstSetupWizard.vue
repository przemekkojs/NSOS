<script setup lang="ts">
import StepProfile from "./components/StepProfile.vue";
import StepUniversity from "./components/StepUniversity.vue";
import StepFaculties from "./components/StepFaculties.vue";
import StepPositions from "./components/StepPositions.vue";
import StepComplete from "./components/StepComplete.vue";
import { useOnboarding } from "./useOnboarding";
import type { University } from "~/lib/api/schemas";

const {
  steps,
  currentStepIndex,
  goToNext,
  goToPrevious,
  goToStep,
  saveAndExit,
  canGoBack,
  store,
} = useOnboarding();

const stepComponents: Record<string, Component> = {
  profile: StepProfile,
  university: StepUniversity,
  faculties: StepFaculties,
  positions: StepPositions,
  finish: StepComplete,
};

const activeComponent = computed(() => stepComponents[store.currentStepId]);

const handleStepSuccess = (data?: University) => {
  if (data?.id) {
    if (store.currentStepId === "university") {
      store.setUniversityId(data.id);
    }
  }
  goToNext();
};

const isLastStep = computed(() => store.currentStepId === "finish");
const progress = computed<number>(
  () => ((currentStepIndex.value + 1) / steps.length) * 100,
);
</script>

<template>
  <UContainer class="py-12">
    <div class="max-w-4xl mx-auto">
      <!-- Stepper Component -->
      <UStepper
        :model-value="currentStepIndex"
        :items="steps"
        orientation="horizontal"
        class="mb-8"
      >
        <template #content="{ item: { index, ...item } }">
          <button
            :disabled="index > currentStepIndex"
            class="flex flex-col items-center gap-2 transition-opacity"
            :class="{
              'opacity-50 cursor-not-allowed': index > currentStepIndex,
            }"
            @click="index <= currentStepIndex && goToStep(item.id)"
          >
            <UIcon
              :name="item.icon"
              class="w-5 h-5"
              :class="[
                index < currentStepIndex
                  ? 'text-green-500'
                  : index === currentStepIndex
                    ? 'text-primary'
                    : 'text-gray-400',
              ]"
            />
            <span
              class="text-sm font-medium"
              :class="
                index <= currentStepIndex
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-400'
              "
            >
              {{ item.label }}
            </span>
          </button>
        </template>
      </UStepper>

      <!-- Progress Bar -->
      <UProgress
        v-model="progress"
        :color="isLastStep ? 'success' : 'primary'"
        size="sm"
        class="mb-6"
      />

      <!-- Main Card -->
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold">
                Step {{ currentStepIndex + 1 }} of {{ steps.length }}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ steps[currentStepIndex]?.label }}
              </p>
            </div>
          </div>
        </template>

        <div class="min-h-100 py-4">
          <Transition name="fade-slide" mode="out-in">
            <component
              :is="activeComponent"
              :key="store.currentStepId"
              @success="handleStepSuccess"
            />
          </Transition>
        </div>

        <template #footer>
          <div class="flex items-center justify-between">
            <UButton
              v-if="canGoBack && !isLastStep"
              variant="ghost"
              color="neutral"
              icon="lucide:arrow-left"
              @click="goToPrevious"
            >
              Back
            </UButton>
            <div v-else />

            <div class="flex items-center gap-3">
              <UButton
                v-if="!isLastStep"
                variant="ghost"
                class="cursor-pointer"
                color="neutral"
                icon="lucide:save"
                @click="saveAndExit"
              >
                Save & Exit
              </UButton>

              <div
                class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400"
              >
                <UIcon
                  name="lucide:check-circle"
                  class="w-4 h-4 text-green-500"
                />
                Auto-saved
              </div>
            </div>
          </div>
        </template>
      </UCard>

      <!-- Help Text -->
      <UAlert
        v-if="!isLastStep"
        icon="lucide:info"
        color="info"
        variant="soft"
        class="mt-6"
        title="Your progress is automatically saved"
        description="You can close this wizard at any time and resume later from where you left off."
      />
    </div>
  </UContainer>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
