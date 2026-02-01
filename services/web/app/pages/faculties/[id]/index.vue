<script setup lang="ts">
const router = useRouter();
// @ts-expect-error id should exist here
const id = computed(() => router.currentRoute.value.params.id);

const { isLoading, data } = useFaculty(id);

definePageMeta({
  permission: "university.view_faculty",
});
</script>
<template>
  <div class="flex gap-2">
    <PermissionGuard permission="university.change_faculty">
      <UButton :to="`/faculties/${id}/edit`" :label="$t('button.edit')" />
    </PermissionGuard>
  </div>
  <p v-if="isLoading">Loading ...</p>
  <div v-if="!isLoading && data">
    <h2 class="mb-2 text-2xl">{{ data.name }}</h2>
    <p>{{ data.description }}</p>
  </div>
</template>
