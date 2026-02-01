<script setup lang="ts">
import {
  type Semester,
  type SemesterCreate,
  SemesterCreateSchema,
} from "~/lib/api/schemas";

const props = defineProps<{
  isEdit?: boolean;
  initialData?: Semester;
}>();

const emit = defineEmits<{
  (e: "success", data: SemesterCreate): void;
  (e: "cancel"): void;
}>();

// Fetch faculties for the dropdown
const { data: faculties } = useFaculties();

const year = new Date().getFullYear();

const state = ref<Partial<SemesterCreate>>({
  name: props.initialData?.name || "",
  faculty: props.initialData?.faculty.id || undefined,
  type: props.initialData?.type || "winter",
  academic_year: props.initialData?.academic_year || year.toString(),
  start_date: props.initialData?.start_date || "",
  end_date: props.initialData?.end_date || "",
});

watch(
  state,
  (newValue) => {
    const res = SemesterCreateSchema.safeParse(newValue);

    console.info(res);
  },
  { deep: true, immediate: true },
);
const typeOptions = [
  { label: "Winter", value: "winter" },
  { label: "Summer", value: "summer" },
];

const facultyOptions = computed(() =>
  faculties.value?.results.map((f) => ({
    label: f.name,
    value: f.id,
  })),
);
</script>

<template>
  <UForm
    :schema="SemesterCreateSchema"
    :state="state"
    class="space-y-4"
    @submit.prevent="emit('success', $event.data)"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <UFormField
        :label="$t('form.label.name')"
        name="name"
        required
        class="md:col-span-2"
      >
        <UInput v-model="state.name" placeholder="e.g. Winter Semester 2025" />
      </UFormField>

      <UFormField :label="$t('form.label.faculty')" name="faculty" required>
        <USelect
          v-model="state.faculty"
          :items="facultyOptions"
          placeholder="Select Faculty"
        />
      </UFormField>

      <UFormField :label="$t('form.label.type')" name="type" required>
        <USelect v-model="state.type" :items="typeOptions" />
      </UFormField>

      <UFormField
        :label="$t('form.label.academicYear')"
        name="academic_year"
        required
      >
        <UInput v-model="state.academic_year" placeholder="2025/2026" />
      </UFormField>

      <div class="hidden md:block" />

      <UFormField
        :label="$t('form.label.startDate')"
        name="start_date"
        required
      >
        <UInput v-model="state.start_date" type="date" />
      </UFormField>

      <UFormField :label="$t('form.label.endDate')" name="end_date" required>
        <UInput v-model="state.end_date" type="date" />
      </UFormField>
    </div>

    <div class="flex gap-2 justify-end mt-6">
      <UButton
        type="button"
        color="neutral"
        variant="ghost"
        @click="emit('cancel')"
      >
        {{ $t("button.cancel") }}
      </UButton>
      <UButton type="submit">
        {{ isEdit ? $t("button.update") : $t("button.create") }}
      </UButton>
    </div>
  </UForm>
</template>
