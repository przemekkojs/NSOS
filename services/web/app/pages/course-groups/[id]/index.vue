<!-- <script setup lang="ts">
const router = useRouter();
// @ts-expect-error id exists here as well
const id = computed(() => Number(router.currentRoute.value.params.id));
const { data } = useCourseGroup(id);
definePageMeta({
  permission: "teaching.view_coursegroup",
});
</script>
<template>
  <pre>{{ data }}</pre>
</template> -->

<script setup lang="ts">
const router = useRouter();
// @ts-expect-error id exists here as well
const id = computed(() => Number(router.currentRoute.value.params.id));

const { data: group, isLoading } = useCourseGroup(id);

definePageMeta({
  permission: "teaching.view_coursegroup",
});

// Helper for status colors
const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    active: "green",
    planned: "blue",
    completed: "gray",
    cancelled: "red",
  };
  return colors[status.toLowerCase()] || "primary";
};
</script>

<template>
  <div class="p-4 space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          {{ group?.course?.name || (isLoading && "Loading Course Group...") }}
        </h1>
        <p class="text-sm text-gray-500">
          Group ID: #{{ id }} • {{ group?.semester?.name }}
        </p>
      </div>
      <div class="flex gap-2">
        <UButton
          color="neutral"
          variant="ghost"
          icon="i-heroicons-pencil-square"
          :to="`/course-groups/${id}/edit`"
        >
          Edit Group
        </UButton>
        <UBadge
          :color="getStatusColor(group?.status || 'active')"
          variant="soft"
        >
          {{ group?.status?.toUpperCase() || "ACTIVE" }}
        </UBadge>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <UCard>
          <template #header>
            <div class="flex items-center gap-2 font-semibold">
              <UIcon name="i-heroicons-information-circle" />
              Overview
            </div>
          </template>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <span class="text-xs text-gray-400 uppercase font-bold"
                >Course</span
              >
              <p class="font-medium">
                {{ group?.course?.name }} ({{ group?.course?.code }})
              </p>
            </div>
            <div>
              <span class="text-xs text-gray-400 uppercase font-bold"
                >Faculty</span
              >
              <p class="font-medium">{{ group?.course?.faculty?.name }}</p>
            </div>
            <div>
              <span class="text-xs text-gray-400 uppercase font-bold"
                >Semester</span
              >
              <p class="font-medium">{{ group?.semester?.name }}</p>
            </div>
            <div>
              <span class="text-xs text-gray-400 uppercase font-bold"
                >Max Students</span
              >
              <p class="font-medium">{{ group?.max_students || "No limit" }}</p>
            </div>
          </div>
        </UCard>

        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2 font-semibold">
                <UIcon name="i-heroicons-calendar-days" />
                Scheduled Classes
              </div>
              <UButton
                size="xs"
                variant="soft"
                label="View in Calendar"
                :to="`/harmonogram`"
              />
            </div>
          </template>

          <div v-if="group?.classes?.length" class="space-y-2"></div>
          <div
            v-else
            class="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg"
          >
            No classes scheduled for this group yet.
          </div>
        </UCard>
      </div>

      <div class="space-y-6">
        <UCard>
          <template #header>
            <div class="font-semibold">Lecturer</div>
          </template>
          <div class="flex items-center gap-3">
            <UAvatar :alt="group?.lecturer?.user?.full_name" size="lg" />
            <div>
              <p class="font-bold">
                {{ group?.lecturer?.user?.full_name || "Unassigned" }}
              </p>
              <p class="text-xs text-gray-500">
                {{ group?.lecturer?.position?.name }}
              </p>
            </div>
          </div>
          <template #footer>
            <UButton
              block
              color="gray"
              variant="link"
              icon="i-heroicons-envelope"
              >Contact Lecturer</UButton
            >
          </template>
        </UCard>

        <UCard class="bg-primary-50 dark:bg-primary-900/10 border-primary-200">
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-sm">Workload</span>
              <span class="font-mono font-bold"
                >{{ group?.course?.hours_lecture }}h</span
              >
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm">Course Type</span>
              <UBadge size="xs">{{ group?.course?.course_type }}</UBadge>
            </div>
          </div>
        </UCard>
      </div>
    </div>

    <UAccordion
      :items="[
        { label: 'Raw Data Debug', content: JSON.stringify(group, null, 2) },
      ]"
    />
  </div>
</template>
