<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import type { Position } from "~/lib/api/schemas";

const { t } = useI18n();
const { data, isFetching } = usePositions();

const user = useUserStore();
const getDropdownActions = useTableActions();

const columns = computed<TableColumn<Position>[]>(() => [
  {
    accessorKey: "name",
    header: t("table.column.name"),
  },
  {
    accessorKey: "hourly_rate",
    header: t("table.column.hourly_rate"),
  },
  {
    accessorKey: "workload",
    header: t("table.column.workload"),
  },
  {
    id: "actions",
  },
]);

const permissions = {
  view: user.hasPermission("university.view_faculty"),
  delete: user.hasPermission("university.delete_faculty"),
  change: user.hasPermission("university.change_faculty"),
};

definePageMeta({
  permission: "university.view_faculty",
});
</script>
<template>
  <PermissionGuard permission="university.add_position">
    <div class="flex gap-2">
      <UButton to="/positions/create" :label="$t('button.create')" />
    </div>
  </PermissionGuard>
  <UTable
    ref="table"
    :data="data?.results"
    :loading="isFetching"
    :columns
    sticky
  >
    <template #actions-cell="{ row }">
      <UDropdownMenu
        :items="
          getDropdownActions({
            ...row.original,
            ...permissions,
          })
        "
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
