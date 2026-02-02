<script setup lang="ts">
const router = useRouter();
const id = toRef(() => router.currentRoute.value.params.id);
const { data, isFetching, error } = usePosition(id as unknown as number);

definePageMeta({
  permission: "university.view_position",
});
</script>

<template>
  <UContainer class="py-8">
    <!-- Header with Edit Button -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        {{ $t("position.title") }}
      </h1>
      <PermissionGuard permission="university.add_position">
        <UButton
          :to="`/positions/${id}/edit`"
          icon="i-heroicons-pencil-square"
          :label="$t('button.edit')"
          color="primary"
          variant="solid"
        />
      </PermissionGuard>
    </div>

    <div v-if="isFetching" class="space-y-4">
      <USkeleton class="h-8 w-64" />
      <USkeleton class="h-64 w-full" />
    </div>

    <UAlert
      v-else-if="error"
      icon="i-heroicons-exclamation-triangle"
      color="error"
      :title="$t('position.errorTitle')"
      :description="$t('position.errorDescription')"
      class="mb-6"
    />

    <UCard v-else-if="data" class="max-w-2xl">
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon
            name="i-heroicons-briefcase"
            class="w-6 h-6 text-primary-500"
          />
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ data.name }}
          </h2>
        </div>
      </template>

      <div class="space-y-4">
        <!-- Hourly Rate -->
        <div class="flex justify-between items-center p-3 border rounded-lg">
          <div class="flex items-center gap-2">
            <UIcon
              name="i-heroicons-currency-euro"
              class="w-5 h-5 text-gray-500"
            />
            <span class="font-medium">{{ $t("position.hourlyRate") }}</span>
          </div>
          <span class="font-bold text-primary-600">
            {{ data.hourly_rate }}
            {{ $t("currency.pln") }}
          </span>
        </div>

        <!-- Workload -->
        <div class="flex justify-between items-center p-3 border rounded-lg">
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-clock" class="w-5 h-5 text-gray-500" />
            <span class="font-medium">{{ $t("position.workload") }}</span>
          </div>
          <UBadge color="success" variant="subtle">
            {{ data.workload }}%
          </UBadge>
        </div>
      </div>
    </UCard>
  </UContainer>
</template>
