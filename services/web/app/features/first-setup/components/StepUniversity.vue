<script setup lang="ts">
import UniversityForm from "~/features/university/forms/UniversityForm.vue";
import type { UniversityCreate } from "~/lib/api/schemas";

const emit = defineEmits<{
  success: [data: unknown];
}>();

const store = useOnboardingStore();
const toast = useToast();
const existingUniversity = computed(() => store.universityId);
// @ts-expect-error this exists
const { data: university, isLoading } = useUniversity(store.universityId);
const { mutateAsync: createUniversity } = useCreateUniversity();
const { mutateAsync: updateUniversity } = useUpdateUniversity();

const handleSubmit = async (formData: UniversityCreate) => {
  try {
    if (existingUniversity.value) {
      const result = await updateUniversity({
        id: existingUniversity.value,
        data: formData,
      });

      toast.add({
        title: "University updated",
        description: `${result.name} has been successfully updated.`,
        color: "success",
        icon: "lucide:building-2",
      });

      emit("success", result);
    } else {
      const result = await createUniversity(formData);

      toast.add({
        title: "University created",
        description: `${result.name} has been successfully created.`,
        color: "success",
        icon: "lucide:building-2",
      });

      emit("success", result);
    }
  } catch (error) {
    toast.add({
      title: "Failed to create university",
      // @ts-expect-error assume this works
      description: error.message,
      color: "error",
      icon: "lucide:alert-circle",
    });
  }
};
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-bold mb-2">Create your University</h2>
      <p class="text-gray-600 dark:text-gray-400">
        This will be the main hub for your faculties, courses, and staff.
      </p>
    </div>

    <UAlert
      v-if="existingUniversity"
      icon="lucide:check-circle"
      color="success"
      variant="soft"
      title="University already created"
      description="You can continue to the next step or update your university details below."
    />

    <UniversityForm
      v-if="!existingUniversity || (existingUniversity && !isLoading)"
      :initial-data="university"
      :is-edit="!!existingUniversity"
      @success="handleSubmit"
    />
  </div>
</template>
