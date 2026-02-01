<script setup lang="ts">
import {
  CourseCreateSchema,
  type CourseCreate,
  type Course,
} from "~/lib/api/schemas";

const props = defineProps<{
  isEdit?: boolean;
  initialData?: Course;
}>();

defineEmits<{
  (e: "success", data: CourseCreate): void;
  (e: "cancel"): void;
}>();

const { data: faculties, isLoading: loadingFaculties } = useFaculties();
const { data: courseGroups, isLoading: loadingCourseGroups } =
  useCourseGroups();

const { t } = useI18n();

const COURSE_TYPE_OPTIONS = computed(() => [
  { value: "zal", label: t("form.label.course.zal") },
  { value: "zst", label: t("form.label.course.zst") },
  { value: "egz", label: t("form.label.course.egz") },
  { value: "ekm", label: t("form.label.course.ekm") },
]);

console.info("course group", props.initialData?.course_group);

const state = ref<Partial<CourseCreate>>({
  course_code: props.initialData?.course_code || "",
  name: props.initialData?.name || "",
  weekly_hours: props.initialData?.weekly_hours || undefined,
  weeks_count: props.initialData?.weeks_count || undefined,
  ects: props.initialData?.ects || 0,
  course_group: props.initialData?.course_group || undefined,
  course_type: props.initialData?.course_type || "zal",
  faculty: props.initialData?.faculty || undefined,
});

const facultyOptions = computed(() => {
  if (!faculties.value?.results.length) return [];
  return faculties.value.results.map((f) => ({
    value: f.id,
    label: f.name,
  }));
});

const courseGroupsOptions = computed(() => {
  if (!courseGroups.value?.results.length) return [];
  return courseGroups.value.results.map((cg) => ({
    value: cg.id,
    label: cg.name,
  }));
});
</script>

<template>
  <UForm
    :schema="CourseCreateSchema"
    :state="state"
    class="flex flex-col gap-4"
    @submit="$emit('success', state as CourseCreate)"
  >
    <div class="grid grid-cols-2 gap-4">
      <UFormField
        :label="$t('form.label.courseCode')"
        name="course_code"
        required
      >
        <UInput
          v-model="state.course_code"
          class="w-full"
          :placeholder="$t('form.placeholder.courseCode')"
        />
      </UFormField>

      <UFormField
        :label="$t('form.label.courseType')"
        name="course_type"
        required
      >
        <USelect
          v-model="state.course_type"
          :items="COURSE_TYPE_OPTIONS"
          option-attribute="label"
          value-attribute="value"
          class="w-full"
        />
      </UFormField>
    </div>

    <UFormField :label="$t('form.label.name')" name="name" required>
      <UInput
        v-model="state.name"
        class="w-full"
        :placeholder="$t('form.placeholder.courseName')"
      />
    </UFormField>

    <UFormField :label="$t('form.label.faculty')" name="faculty" required>
      <USelect
        v-model="state.faculty"
        :items="facultyOptions"
        class="w-full"
        :loading="loadingFaculties"
        :placeholder="$t('form.placeholder.selectFaculty')"
      />
    </UFormField>

    <div class="grid grid-cols-3 gap-4">
      <UFormField
        :label="$t('form.label.weeklyHours')"
        name="weekly_hours"
        required
      >
        <UInput
          v-model="state.weekly_hours"
          type="number"
          class="w-full"
          :placeholder="$t('form.placeholder.weeklyHours')"
        />
      </UFormField>

      <UFormField
        :label="$t('form.label.weeksCount')"
        name="weeks_count"
        required
      >
        <UInput
          v-model="state.weeks_count"
          type="number"
          class="w-full"
          :placeholder="$t('form.placeholder.weeksCount')"
        />
      </UFormField>

      <UFormField :label="$t('form.label.ects')" name="ects" required>
        <UInput
          v-model="state.ects"
          type="number"
          class="w-full"
          :placeholder="$t('form.placeholder.ects')"
        />
      </UFormField>
    </div>

    <UFormField :label="$t('form.label.courseGroup')" name="course_group">
      <USelect
        v-model="state.course_group"
        :items="courseGroupsOptions"
        :loading="loadingCourseGroups"
        class="w-full"
      />
    </UFormField>

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
