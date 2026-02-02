<script setup lang="ts">
defineProps<{
  steps: Array<{ id: string; label: string; icon: string }>;
  currentIndex: number;
}>();

const emit = defineEmits<{
  stepClick: [stepId: string];
}>();
</script>

<template>
  <div class="rounded-xl p-6 shadow">
    <div class="flex items-center justify-between">
      <div
        v-for="(step, index) in steps"
        :key="step.id"
        class="flex items-center flex-1"
      >
        <button
          :disabled="index > currentIndex"
          class="flex flex-col items-center group"
          :class="{ 'cursor-pointer': index <= currentIndex }"
          @click="index <= currentIndex && emit('stepClick', step.id)"
        >
          <div
            class="w-12 h-12 rounded-full flex items-center justify-center transition-all"
            :class="[
              index < currentIndex
                ? 'bg-green-500 text-white'
                : index === currentIndex
                  ? 'bg-primary text-white ring-4 ring-primary/20'
                  : 'bg-gray-200 text-gray-400',
            ]"
          >
            <UIcon
              v-if="index < currentIndex"
              name="lucide:check"
              class="w-6 h-6"
            />
            <UIcon v-else :name="step.icon" class="w-6 h-6" />
          </div>
          <span
            class="text-xs mt-2 font-medium transition-colors"
            :class="index <= currentIndex ? 'text-gray-900' : 'text-gray-400'"
          >
            {{ step.label }}
          </span>
        </button>

        <div
          v-if="index < steps.length - 1"
          class="flex-1 h-1 mx-4 rounded transition-colors"
          :class="index < currentIndex ? 'bg-green-500' : 'bg-gray-200'"
        />
      </div>
    </div>
  </div>
</template>
