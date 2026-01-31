<script setup lang="ts">
const router = useRouter();
// @ts-expect-error this exists
const id = toRef(() => router.currentRoute.value.params.id);
const { data } = usePosition(id);

definePageMeta({
  permission: "university.view_position",
});
</script>
<template>
  <PermissionGuard permission="university.add_position">
    <div class="flex gap-2">
      <UButton :to="`/positions/${id}/edit`" :label="$t('button.edit')" />
    </div>
  </PermissionGuard>
  <div v-if="!!data">
    <h2 class="mb-2 text-2xl">{{ data.name }}</h2>
    <p>{{ data.hourly_rate }}</p>
    <p>{{ data.workload }}</p>
  </div>
</template>
