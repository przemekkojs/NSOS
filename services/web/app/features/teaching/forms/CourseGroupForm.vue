<script setup lang="ts">
import {
  CourseGroupCreateSchema,
  type CourseGroup,
  type CourseGroupCreate,
} from "~/lib/api/schemas";

const props = defineProps<{
  isEdit?: boolean;
  initialData?: CourseGroup;
}>();

defineEmits<{
  (e: "success", data: CourseGroupCreate): void;
  (e: "cancel"): void;
}>();

// Fetch related data for dropdowns
const { data: courses, isLoading: loadingCourses } = useCourses();
const { data: lecturers, isLoading: loadingLecturers } = useLecturers();
const { data: semesters, isLoading: loadingSemesters } = useSemesters();

const WEEKDAY_OPTIONS = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
];

const state = ref<Partial<CourseGroupCreate>>({
  course: props.initialData?.course || undefined,
  name: props.initialData?.name || "",
  lecturer: props.initialData?.lecturer || undefined,
  weekday: props.initialData?.weekday || "monday",
  start_time: props.initialData?.start_time || "",
  end_time: props.initialData?.end_time || "",
  room: props.initialData?.room || "",
  semester: props.initialData?.semester || undefined,
});

const courseOptions = computed(() => {
  if (!courses.value) return [];
  return courses.value.results.map((c) => ({
    value: c.id,
    label: `${c.course_code} - ${c.name}`,
  }));
});

const lecturerOptions = computed(() => {
  if (!lecturers.value) return [];
  return lecturers.value.results.map((l) => ({
    value: l.id,
    label: `${l.first_name} ${l.last_name}`,
  }));
});

const semesterOptions = computed(() => {
  if (!semesters.value) return [];
  return semesters.value.results.map((s) => ({
    value: s.id,
    label: `${s.name} (${s.academic_year})`,
  }));
});
</script>

<template>
  <UForm
    :schema="CourseGroupCreateSchema"
    :state="state"
    class="flex flex-col gap-4"
    @submit="$emit('success', state as CourseGroupCreate)"
  >
    <UFormField :label="$t('form.label.course')" name="course" required>
      <USelect
        v-model="state.course"
        :items="courseOptions"
        option-attribute="label"
        value-attribute="value"
        class="w-full"
        :loading="loadingCourses"
        :placeholder="$t('form.placeholder.selectCourse')"
      />
    </UFormField>

    <UFormField :label="$t('form.label.name')" name="name" required>
      <UInput
        v-model="state.name"
        class="w-full"
        :placeholder="$t('form.placeholder.groupName')"
      />
    </UFormField>

    <div class="grid grid-cols-2 gap-4">
      <UFormField :label="$t('form.label.lecturer')" name="lecturer">
        <USelect
          v-model="state.lecturer"
          :items="lecturerOptions"
          option-attribute="label"
          value-attribute="value"
          class="w-full"
          :loading="loadingLecturers"
          :placeholder="$t('form.placeholder.selectLecturer')"
        />
      </UFormField>

      <UFormField :label="$t('form.label.semester')" name="semester" required>
        <USelect
          v-model="state.semester"
          :items="semesterOptions"
          option-attribute="label"
          value-attribute="value"
          class="w-full"
          :loading="loadingSemesters"
          :placeholder="$t('form.placeholder.selectSemester')"
        />
      </UFormField>
    </div>

    <UFormField :label="$t('form.label.weekday')" name="weekday" required>
      <USelect
        v-model="state.weekday"
        :items="WEEKDAY_OPTIONS"
        option-attribute="label"
        value-attribute="value"
        class="w-full"
      />
    </UFormField>

    <div class="grid grid-cols-3 gap-4">
      <UFormField
        :label="$t('form.label.startTime')"
        name="start_time"
        required
      >
        <UInput v-model="state.start_time" type="time" class="w-full" />
      </UFormField>

      <UFormField :label="$t('form.label.endTime')" name="end_time" required>
        <UInput v-model="state.end_time" type="time" class="w-full" />
      </UFormField>

      <UFormField :label="$t('form.label.room')" name="room" required>
        <UInput
          v-model="state.room"
          class="w-full"
          :placeholder="$t('form.placeholder.room')"
        />
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
