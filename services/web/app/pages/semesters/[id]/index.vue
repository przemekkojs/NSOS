<script setup lang="ts">
const router = useRouter();
// @ts-expect-error id should exist here
const id = computed(() => router.currentRoute.value.params.id);

const { data: semester } = useSemester(id);

definePageMeta({
  permission: "university.view_semester",
});

// Calculate progress through the semester
const progress = computed(() => {
  if (!semester.value) return 0;
  const start = new Date(semester.value.start_date).getTime();
  const end = new Date(semester.value.end_date).getTime();
  const now = new Date().getTime();

  if (now < start) return 0;
  if (now > end) return 100;
  return Math.round(((now - start) / (end - start)) * 100);
});
</script>

<template>
  <div class="p-6 max-w-5xl mx-auto space-y-6">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div class="space-y-1">
        <div class="flex items-center gap-2">
          <UBadge variant="subtle" class="capitalize">
            {{ semester?.type }}
          </UBadge>
          <span class="text-sm text-gray-500">{{
            semester?.academic_year
          }}</span>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          {{ semester?.name || "Loading Semester..." }}
        </h1>
      </div>

      <div class="flex gap-2">
        <PermissionGuard permission="university.change_semester">
          <UButton
            icon="i-heroicons-pencil-square"
            variant="ghost"
            color="neutral"
            :to="$localePath({ name: 'semesters-id-edit', params: { id } })"
          >
            {{ $t("button.edit") }}
          </UButton>
        </PermissionGuard>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <UCard class="md:col-span-2">
        <template #header>
          <div
            class="flex items-center gap-2 font-semibold text-sm uppercase tracking-wider text-gray-500"
          >
            <UIcon name="i-heroicons-calendar" />
            Semester Duration
          </div>
        </template>

        <div class="space-y-6 py-2">
          <div class="flex justify-between items-center text-sm font-medium">
            <div class="text-center">
              <p class="text-gray-400 text-xs uppercase">Start Date</p>
              <p>{{ semester?.start_date }}</p>
            </div>
            <UIcon
              name="i-heroicons-arrow-long-right"
              class="text-gray-300 w-8 h-8"
            />
            <div class="text-center">
              <p class="text-gray-400 text-xs uppercase">End Date</p>
              <p>{{ semester?.end_date }}</p>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between text-xs">
              <span>Semester Progress</span>
              <span>{{ progress }}%</span>
            </div>
            <UProgress :value="progress" color="primary" />
          </div>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <div
            class="font-semibold text-sm uppercase tracking-wider text-gray-500"
          >
            Organization
          </div>
        </template>
        <div class="space-y-4">
          <div>
            <p class="text-xs text-gray-400 uppercase">Faculty</p>
            <p class="font-medium">{{ semester?.faculty?.name }}</p>
          </div>
          <UButton
            block
            variant="soft"
            icon="i-heroicons-academic-cap"
            label="View Faculty"
            :to="
              $localePath({
                name: 'faculties-id',
                params: { id: semester?.faculty?.id },
              })
            "
          />
        </div>
      </UCard>
    </div>

    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="font-bold">Course Groups in this Semester</h3>
          <UButton
            size="xs"
            icon="i-heroicons-plus"
            label="Add Group"
            :to="
              $localePath({
                name: 'course-groups-create',
                query: { semesterId: id },
              })
            "
          />
        </div>
      </template>

      <div
        v-if="semester?.semester_groups?.length"
        class="divide-y divide-gray-100 dark:divide-gray-800"
      >
        <div
          v-for="group in semester.semester_groups"
          :key="group.id"
          class="py-3 flex justify-between items-center"
        >
          <div>
            <p class="font-medium">{{ group.name }}</p>
            <p class="text-xs text-gray-500">
              {{ group.course }} • {{ group.lecturer }}
            </p>
          </div>
          <UButton
            icon="i-heroicons-chevron-right"
            variant="ghost"
            color="neutral"
            :to="
              $localePath({
                name: 'course-groups-id',
                params: { id: group.id },
              })
            "
          />
        </div>
      </div>
      <div v-else class="text-center py-12">
        <p class="text-gray-400 italic">
          No course groups registered for this semester yet.
        </p>
      </div>
    </UCard>

    <UAccordion
      variant="ghost"
      :items="[
        {
          label: 'Debug Information',
          content: JSON.stringify(semester, null, 2),
        },
      ]"
      class="mt-10"
    />
  </div>
</template>
