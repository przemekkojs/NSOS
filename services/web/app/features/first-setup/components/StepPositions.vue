<script setup lang="ts">
import PositionForm from "~/features/university/forms/PositionForm.vue";
import type { Position, PositionCreate } from "~/lib/api/schemas";

const emit = defineEmits<{
  success: [];
}>();

const store = useOnboardingStore();
const { mutateAsync: createPosition } = useCreatePosition();

const positions = ref<Position[]>([]);
const showForm = ref(true);

const handleAddPosition = async (data: PositionCreate) => {
  const result = await createPosition(data);
  store.addPositionId(result.id);
  positions.value.push(result);
  showForm.value = false;
};

const handleSkip = () => {
  emit("success");
};

const handleContinue = () => {
  emit("success");
};
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold mb-2">Add Positions (Optional)</h2>
    <p class="text-gray-500 mb-6">
      Define staff positions and their hourly rates.
    </p>

    <div v-if="positions.length > 0" class="mb-6 space-y-2">
      <div
        v-for="position in positions"
        :key="position.id"
        class="flex items-center justify-between p-3 rounded-lg"
      >
        <div>
          <span class="font-medium">{{ position.name }}</span>
          <p class="text-sm text-gray-500">{{ position.hourly_rate }} / hour</p>
        </div>
        <UBadge color="success" variant="subtle">Added</UBadge>
      </div>
    </div>

    <PositionForm v-if="showForm" @success="handleAddPosition" />

    <div v-else class="flex gap-3">
      <UButton variant="outline" class="flex-1" @click="showForm = true">
        Add Another
      </UButton>
      <UButton class="flex-1" @click="handleContinue"> Continue </UButton>
    </div>

    <UButton
      v-if="positions.length === 0"
      variant="ghost"
      class="w-full mt-4"
      @click="handleSkip"
    >
      Skip for now
    </UButton>
  </div>
</template>
