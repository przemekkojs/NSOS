<script setup lang="ts">
import { useInstitutions } from "~/composables/api/useInstitutions";
import { useTableActions } from "~/composables/useTableActions";
import CreateInstitutionModal from "~/features/institutions/components/InstitutionModal.vue";
// TODO: replace with correct Institution type when available
import type { Institution } from "~/mocks/fixtures/institutions";
import type { TableColumn } from "@nuxt/ui";

const { data: institutions, isFetching } = useInstitutions();
const getDropdownActions = useTableActions();
const { t, locale } = useI18n();

const columns = computed<TableColumn<Institution>[]>(() => [
  { accessorKey: "name", header: t("table.column.name") },
  { accessorKey: "address", header: t("table.column.address") },
  {
    id: "actions",
  },
]);

definePageMeta({
  // @ts-expect-error change when institution backend is added
  permission: "university.add_institution",
});
</script>
<template>
  <div class="flex gap-2">
    <PermissionGuard permission="university.add_faculty">
      <CreateInstitutionModal />
    </PermissionGuard>
  </div>
  <UTable
    :key="locale"
    :data="institutions?.results"
    :loading="isFetching"
    :columns
  >
    <template #actions-cell="{ row }">
      <UDropdownMenu :items="getDropdownActions(row.original)">
        <UButton
          icon="i-lucide-ellipsis-vertical"
          color="neutral"
          variant="ghost"
          aria-label="actions"
        />
      </UDropdownMenu>
    </template>
  </UTable>
</template>
