<script setup lang="ts">
import FacultyForm from "~/features/university/forms/FacultyForm.vue";
import type { Faculty, FacultyCreate } from "~/lib/api/schemas";

const emit = defineEmits<{
  success: [];
}>();

const store = useOnboardingStore();
const toast = useToast();
const { mutateAsync: createFaculty, isPending } = useCreateFaculty();

const faculties = ref<Faculty[]>([]);
const showForm = ref(true);

const handleAddFaculty = async (data: FacultyCreate) => {
  console.log(store.universityId);
  try {
    if (!store.universityId) {
      throw new Error("University Id not specified");
    }
    const result = await createFaculty({
      ...data,
      university: store.universityId,
    });

    store.addFacultyId(result.id);
    faculties.value.push(result);
    showForm.value = false;

    toast.add({
      title: "Faculty added",
      description: `${result.name} has been created.`,
      color: "success",
      icon: "lucide:book-open",
    });
  } catch (error) {
    toast.add({
      title: "Failed to create faculty",
      // @ts-expect-error let's assume this exists
      description: error.message,
      color: "error",
      icon: "lucide:alert-circle",
    });
  }
};

const initialData = computed(() => {
  if (store.universityId) {
    return {
      university: store.universityId,
    };
  }

  return undefined;
});

const handleContinue = () => {
  if (faculties.value.length === 0) {
    toast.add({
      title: "No faculties added",
      description: "Add at least one faculty to continue.",
      color: "warning",
      icon: "lucide:alert-triangle",
    });
    return;
  }
  emit("success");
};
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-bold mb-2">Add Faculties</h2>
      <p class="text-gray-600 dark:text-gray-400">
        Create at least one faculty to organize your courses and staff.
      </p>
    </div>

    <!-- Added Faculties List -->
    <div v-if="faculties.length > 0" class="space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">
          Added Faculties
        </h3>
        <UBadge color="success" variant="subtle">
          {{ faculties.length }}
          {{ faculties.length === 1 ? "faculty" : "faculties" }}
        </UBadge>
      </div>

      <div class="space-y-2">
        <UCard
          v-for="faculty in faculties"
          :key="faculty.id"
          class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <UIcon name="lucide:book-open" class="w-5 h-5 text-primary" />
              <div>
                <p class="font-medium">{{ faculty.name }}</p>
                <p
                  v-if="faculty.description"
                  class="text-sm text-gray-500 dark:text-gray-400"
                >
                  {{ faculty.description }}
                </p>
              </div>
            </div>
            <UBadge color="success">{{ $t("common.added") }}</UBadge>
          </div>
        </UCard>
      </div>
    </div>

    <!-- Form or Actions -->
    <div v-if="showForm">
      <FacultyForm
        :initial-data="initialData"
        :loading="isPending"
        @success="handleAddFaculty"
      />
    </div>

    <div v-else class="space-y-3">
      <UButton
        variant="outline"
        block
        icon="lucide:plus"
        @click="showForm = true"
      >
        Add Another Faculty
      </UButton>

      <UButton
        block
        trailing-icon="lucide:arrow-right"
        :disabled="faculties.length === 0"
        @click="handleContinue"
      >
        Continue to Positions
      </UButton>
    </div>

    <UAlert
      icon="lucide:lightbulb"
      color="info"
      variant="soft"
      title="Tip"
      description="You can add more faculties later from the dashboard."
    />
  </div>
</template>
