<script setup lang="ts">
const router = useRouter();
// @ts-expect-error id exists here as well
const id = computed(() => Number(router.currentRoute.value.params.id));

const { data: course, isFetching } = useCourse(id);

const items = [
  {
    label: "General Info",
    icon: "i-heroicons-information-circle",
    slot: "info",
  },
  { label: "Course Groups", icon: "i-heroicons-users", slot: "groups" },
];

definePageMeta({
  permission: "teaching.view_course",
});
</script>

<template>
  <UContainer class="py-8">
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
    >
      <div>
        <div class="flex items-center gap-2 mb-2">
          <UBadge variant="subtle" color="primary">{{
            course?.course_code
          }}</UBadge>
          <UBadge variant="outline" color="neutral">{{
            course?.course_type
          }}</UBadge>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          {{ course?.name || "Loading Course..." }}
        </h1>
        <p class="text-gray-500 mt-1">
          Managed by
          <span class="font-medium text-gray-700 dark:text-gray-300">{{
            course?.faculty || "Faculty"
          }}</span>
        </p>
      </div>

      <div class="flex items-center gap-3">
        <PermissionGuard permission="teaching.change_course">
          <UButton
            :to="$localePath({ name: 'courses-id-edit', params: { id } })"
            icon="i-heroicons-pencil-square"
          >
            {{ $t("button.edit") }}
          </UButton>
        </PermissionGuard>
        <UButton
          icon="i-heroicons-list-bullet"
          variant="soft"
          label="View Groups"
          :to="$localePath({ name: 'course-groups', query: { courseId: id } })"
        />
      </div>
    </div>

    <div v-if="isFetching" class="space-y-4">
      <USkeleton class="h-32 w-full" />
      <USkeleton class="h-64 w-full" />
    </div>

    <div v-else-if="course" class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <UCard class="md:col-span-1">
        <template #header>
          <h3 class="font-semibold">Curriculum Details</h3>
        </template>
        <div class="space-y-4">
          <div class="flex justify-between border-b dark:border-gray-800 pb-2">
            <span class="text-gray-500">ECTS Credits</span>
            <span class="font-bold text-primary-600">{{ course.ects }}</span>
          </div>
          <div class="flex justify-between border-b dark:border-gray-800 pb-2">
            <span class="text-gray-500">Weekly Hours</span>
            <span class="font-medium">{{ course.weekly_hours }}h</span>
          </div>
          <div class="flex justify-between border-b dark:border-gray-800 pb-2">
            <span class="text-gray-500">Duration (Weeks)</span>
            <span class="font-medium">{{ course.weeks_count }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">Total Hours</span>
            <span class="font-medium"
              >{{ course.weekly_hours * course.weeks_count }}h</span
            >
          </div>
        </div>
      </UCard>

      <UCard class="md:col-span-2">
        <UTabs
          :items="[
            { label: 'General Info', icon: 'i-heroicons-information-circle' },
            { label: 'Course Groups', icon: 'i-heroicons-users' },
          ]"
        >
          <template #item="{ item }">
            <div v-if="item.label === 'General Info'" class="py-4 space-y-4">
              <div>
                <h4 class="text-xs font-bold uppercase text-gray-400 mb-1">
                  Internal Reference
                </h4>
                <p
                  class="font-mono bg-gray-50 dark:bg-gray-800 p-2 rounded text-sm"
                >
                  ID: {{ id }}
                </p>
              </div>

              <div>
                <h4 class="text-xs font-bold uppercase text-gray-400 mb-1">
                  Syllabus Note
                </h4>
                <p class="text-gray-600 dark:text-gray-400 italic">
                  No additional course description provided.
                </p>
              </div>
            </div>

            <div
              v-else-if="item.label === 'Course Groups'"
              class="py-4 text-center"
            >
              <p class="text-sm text-gray-500 mb-4">
                View active groups for this course in the current semester.
              </p>
              <UButton
                size="sm"
                variant="outline"
                icon="i-heroicons-arrow-top-right-on-square"
                label="Manage Course Groups"
              />
            </div>
          </template>
        </UTabs>
      </UCard>
    </div>

    <div class="mt-12 opacity-20 hover:opacity-100 transition-opacity">
      <UAccordion
        :items="[
          {
            label: 'Developer Raw Data',
            content: JSON.stringify(course, null, 2),
          },
        ]"
      />
    </div>
  </UContainer>
</template>
