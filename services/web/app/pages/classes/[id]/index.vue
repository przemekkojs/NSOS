<script setup lang="ts">
const router = useRouter();
// @ts-expect-error id exists for sure
const id = computed(() => Number(router.currentRoute.value.params.id));

// Fetch the class instance
const { data: classInstance, isLoading } = useClass(id);

// Derived data
const lecturerId = computed(() => classInstance.value?.lecturer);
const courseGroupId = computed(() => classInstance.value?.course_group);
// const scheduleId = computed(() => classInstance.value?.schedule?.id);

// Fetch related entities
// @ts-expect-error too little time to fix types
const { data: lecturer } = useLecturer(lecturerId);
// @ts-expect-error too little time to fix types
const { data: courseGroup } = useCourseGroup(courseGroupId);

const userId = computed(() => lecturer.value?.user);
// const { data: schedule } = useSchedule(scheduleId);

const fullName = computed(
  () => lecturer.value?.first_name + " " + lecturer.value?.last_name,
);

definePageMeta({
  permission: "teaching.view_class",
});
</script>
<template>
  <div class="p-4 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          {{ courseGroup?.course || (isLoading && "Loading Class...") }}
        </h1>
        <p class="text-sm text-gray-500">
          Class ID: #{{ id }} • {{ classInstance?.date_held }}
        </p>
      </div>
      <div class="flex gap-2">
        <UButton
          color="neutral"
          variant="ghost"
          icon="i-heroicons-pencil-square"
          :to="`/classes/${id}/edit`"
          >{{ $t("classes.edit") }}</UButton
        >
        <UBadge variant="soft">
          {{ classInstance?.status?.toUpperCase() || "SCHEDULED" }}
        </UBadge>
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column: Class Details -->
      <div class="lg:col-span-2 space-y-6">
        <UCard>
          <template #header>
            <div class="flex items-center gap-2 font-semibold">
              <UIcon name="i-heroicons-information-circle" />
              {{ $t("classes.detail") }}
            </div>
          </template>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <span class="text-xs text-gray-400 uppercase font-bold">{{
                $t("form.label.courseGroup")
              }}</span>
              <p class="font-medium">
                {{ courseGroup?.name || "N/A" }}
              </p>
            </div>
            <div>
              <span class="text-xs text-gray-400 uppercase font-bold">{{
                $t("navigation.schedule")
              }}</span>
              <p class="font-medium">
                {{ false || "Not assigned" }}
              </p>
            </div>
            <div>
              <span class="text-xs text-gray-400 uppercase font-bold">{{
                $t("form.label.date")
              }}</span>
              <p class="font-medium">
                {{ classInstance?.date_held }}
              </p>
            </div>
            <div>
              <span class="text-xs text-gray-400 uppercase font-bold">{{
                $t("common.time")
              }}</span>
              <p class="font-medium">
                {{ classInstance?.start_time }} –
                {{ classInstance?.end_time }}
              </p>
            </div>
            <div>
              <span class="text-xs text-gray-400 uppercase font-bold">{{
                $t("form.label.room")
              }}</span>
              <p class="font-medium">
                {{ classInstance?.room || "Not assigned" }}
              </p>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Right Column: Lecturer and Status -->
      <div class="space-y-6">
        <UCard>
          <template #header>
            <div class="font-semibold">{{ $t("form.label.lecturer") }}</div>
          </template>
          <NuxtLinkLocale :to="`/employees/${userId}`">
            <div class="flex items-center gap-3">
              <UAvatar :alt="fullName" size="lg" />
              <div>
                <p class="font-bold">
                  {{ fullName || "Unassigned" }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ lecturer?.position }}
                </p>
              </div>
            </div>
          </NuxtLinkLocale>

          <template #footer>
            <UButton
              block
              color="neutral"
              variant="link"
              icon="i-heroicons-envelope"
            >
              Contact Lecturer
            </UButton>
          </template>
        </UCard>

        <UCard class="bg-primary-50 dark:bg-primary-900/10 border-primary-200">
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-sm">Status</span>
              <UBadge size="xs">
                {{ classInstance?.status?.toUpperCase() }}
              </UBadge>
            </div>
          </div>
        </UCard>
      </div>
    </div>

    <!-- Debug Section -->
    <UAccordion
      :items="[
        {
          label: 'Raw Data Debug',
          content: JSON.stringify(classInstance, null, 2),
        },
      ]"
    />
  </div>
</template>
