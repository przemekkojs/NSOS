<script setup lang="ts">
import { useUniversities } from "~/composables/api/useUniversities";
import { useTableActions } from "~/composables/useTableActions";
// import CreateUniversityModal from "~/features/university/modals/UniversityModal.vue";
// TODO: replace with correct University type when available
import type { TableColumn } from "@nuxt/ui";
import type { University } from "~/lib/api/schemas";

const { data: universities, isFetching } = useUniversities();
const getDropdownActions = useTableActions();
const { t, locale } = useI18n();

const columns = computed<TableColumn<University>[]>(() => [
  { accessorKey: "name", header: t("table.column.name") },
  {
    accessorKey: "description",
    header: t("table.column.description"),
  },
  {
    id: "actions",
  },
]);
const user = useUserStore();
const permissions = {
  view: user.hasPermission("university.add_university"),
  delete: user.hasPermission("university.delete_university"),
  change: user.hasPermission("university.change_university"),
};

definePageMeta({
  permission: "university.add_university",
});
</script>
<template>
  <div class="flex gap-2">
    <PermissionGuard permission="university.add_university">
      <!-- <CreateUniversityModal /> -->
      <UButton to="/universities/create" :label="$t('button.create')" />
    </PermissionGuard>
  </div>
  <UTable
    :key="locale"
    :data="universities?.results"
    :loading="isFetching"
    :columns
  >
    <template #actions-cell="{ row }">
      <UDropdownMenu
        :items="getDropdownActions({ ...row.original, ...permissions })"
      >
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
