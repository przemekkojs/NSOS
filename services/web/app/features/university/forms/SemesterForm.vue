<script setup lang="ts">
import * as z from "zod";

const props = defineProps<{
  isEdit?: boolean;
  initialData?: {
    id?: number;
    name: string;
    faculty: number;
    type: "winter" | "summer";
    academic_year: string;
    start_date: string;
    end_date: string;
  };
}>();

defineEmits<{
  (e: "success", data: SemesterFormData): void;
  (e: "cancel"): void;
}>();

// Fetch faculties for the dropdown
const { data: faculties, isLoading: loadingFaculties } = useFaculties();

const SEMESTER_TYPE_OPTIONS = [
  { value: "winter", label: "Winter" },
  { value: "summer", label: "Summer" },
];

const semesterFormSchema = z
  .object({
    name: z.string().min(1, "Name is required").max(50),
    faculty: z.coerce.number().positive("Faculty is required"),
    type: z.enum(["winter", "summer"]),
    academic_year: z
      .string()
      .regex(/^\d{4}\/\d{4}$/, "Academic year must be in format YYYY/YYYY"),
    start_date: z.string().min(1, "Start date is required"),
    end_date: z.string().min(1, "End date is required"),
  })
  .refine(
    (data) => {
      const start = new Date(data.start_date);
      const end = new Date(data.end_date);
      return end > start;
    },
    {
      message: "End date must be after start date",
      path: ["end_date"],
    },
  );

type SemesterFormData = z.infer<typeof semesterFormSchema>;

const state = ref<Partial<SemesterFormData>>({
  name: props.initialData?.name || "",
  faculty: props.initialData?.faculty || undefined,
  type: props.initialData?.type || "winter",
  academic_year: props.initialData?.academic_year || "",
  start_date: props.initialData?.start_date || "",
  end_date: props.initialData?.end_date || "",
});

const facultyOptions = computed(() => {
  if (!faculties.value) return [];
  return faculties.value.results.map((f) => ({
    value: f.id,
    label: f.name,
  }));
});
</script>

<template>
  <UForm
    :schema="semesterFormSchema"
    :state="state"
    class="flex flex-col gap-4"
    @submit="$emit('success', state as SemesterFormData)"
  >
    <UFormField :label="$t('form.label.name')" name="name" required>
      <UInput
        v-model="state.name"
        class="w-full"
        :placeholder="$t('form.placeholder.semesterName')"
      />
    </UFormField>

    <UFormField :label="$t('form.label.faculty')" name="faculty" required>
      <USelect
        v-model="state.faculty"
        :options="facultyOptions"
        option-attribute="label"
        value-attribute="value"
        class="w-full"
        :loading="loadingFaculties"
        :placeholder="$t('form.placeholder.selectFaculty')"
      />
    </UFormField>

    <UFormField :label="$t('form.label.semesterType')" name="type" required>
      <USelect
        v-model="state.type"
        :options="SEMESTER_TYPE_OPTIONS"
        option-attribute="label"
        value-attribute="value"
        class="w-full"
      />
    </UFormField>

    <UFormField
      :label="$t('form.label.academicYear')"
      name="academic_year"
      required
      :help="$t('form.help.academicYear')"
    >
      <UInput
        v-model="state.academic_year"
        class="w-full"
        placeholder="2025/2026"
      />
    </UFormField>

    <div class="grid grid-cols-2 gap-4">
      <UFormField
        :label="$t('form.label.startDate')"
        name="start_date"
        required
      >
        <UInput v-model="state.start_date" type="date" class="w-full" />
      </UFormField>

      <UFormField :label="$t('form.label.endDate')" name="end_date" required>
        <UInput v-model="state.end_date" type="date" class="w-full" />
      </UFormField>
    </div>

    <div class="flex gap-2 justify-end mt-4">
      <UButton
        type="button"
        color="neutral"
        variant="outline"
        @click="$emit('cancel')"
      >
        {{ $t("button.cancel") }}
      </UButton>
      <UButton type="submit" class="text-white">
        {{ isEdit ? $t("button.update") : $t("button.create") }}
      </UButton>
    </div>
  </UForm>
</template>
