<script setup lang="ts">
const router = useRouter();
// @ts-expect-error id should exist here
const id = computed(() => router.currentRoute.value.params.id);

const { isLoading, data: faculty } = useFaculty(id);

definePageMeta({
  permission: "university.view_faculty",
});

const facultyCode = computed(() =>
  faculty.value?.name?.substring(0, 3).toUpperCase(),
);
</script>

<template>
  <div class="p-6 max-w-5xl mx-auto space-y-6">
    <div v-if="isLoading" class="space-y-4">
      <div class="flex justify-between">
        <div class="space-y-2">
          <USkeleton class="h-4 w-20" />
          <USkeleton class="h-8 w-64" />
        </div>
        <USkeleton class="h-9 w-24" />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <USkeleton class="h-64 md:col-span-2" />
        <USkeleton class="h-64" />
      </div>
    </div>

    <div v-else-if="faculty" class="space-y-6">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <UBadge variant="subtle" color="primary" class="uppercase">
              {{ $t("course.faculty") }}
            </UBadge>
            <span v-if="facultyCode" class="text-sm text-gray-500 font-mono">
              #{{ facultyCode }}
            </span>
          </div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
            {{ faculty.name }}
          </h1>
        </div>

        <div class="flex gap-2">
          <PermissionGuard permission="university.change_faculty">
            <UButton
              icon="i-heroicons-pencil-square"
              variant="ghost"
              color="neutral"
              :to="$localePath({ name: 'faculties-id-edit', params: { id } })"
            >
              {{ $t("button.edit") }}
            </UButton>
          </PermissionGuard>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <UCard class="md:col-span-2 h-full">
          <template #header>
            <div
              class="flex items-center gap-2 font-semibold text-sm uppercase tracking-wider text-gray-500"
            >
              <UIcon name="i-heroicons-information-circle" />
              {{ $t("common.about") }}
            </div>
          </template>

          <div
            class="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300"
          >
            <p v-if="faculty.description">
              {{ faculty.description }}
            </p>
            <p v-else class="italic text-gray-400">
              {{ $t("faculty.noDescription") }}
            </p>
          </div>
        </UCard>

        <div class="space-y-6">
          <UCard>
            <template #header>
              <div
                class="font-semibold text-sm uppercase tracking-wider text-gray-500"
              >
                {{ $t("faculty.overview") }}
              </div>
            </template>

            <div class="space-y-4">
              <div>
                <p class="text-xs text-gray-400 uppercase">
                  {{ $t("form.label.status") }}
                </p>
                <div class="flex items-center gap-2 mt-1">
                  <div class="w-2 h-2 rounded-full bg-green-500"/>
                  <span class="font-medium text-sm">{{
                    $t("common.status.active")
                  }}</span>
                </div>
              </div>

              <UDivider />

              <UButton
                block
                variant="soft"
                icon="i-heroicons-book-open"
                :label="$t('faculty.viewCourses')"
                :to="$localePath({ name: 'courses', query: { facultyId: id } })"
              />
            </div>
          </UCard>
        </div>
      </div>

      <UAccordion
        variant="ghost"
        :items="[
          {
            label: 'Debug Information',
            content: JSON.stringify(faculty, null, 2),
          },
        ]"
        class="mt-10"
      />
    </div>

    <div v-else class="text-center py-12">
      <UIcon
        name="i-heroicons-building-library"
        class="w-12 h-12 text-gray-300 mx-auto mb-4"
      />
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
        {{ $t("faculty.notFound") }}
      </h3>
      <p class="text-gray-500">{{ $t("faculty.notFoundMessage") }}</p>
    </div>
  </div>
</template>
