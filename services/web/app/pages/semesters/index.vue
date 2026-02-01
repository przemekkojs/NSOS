<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import type { Semester } from "~/lib/api/schemas";

const { t } = useI18n();
const { data, isFetching } = useSemesters();
const { mutateAsync: remove } = useDeleteSemester();
const user = useUserStore();
const getDropdownActions = useTableActions();

const columns = computed<TableColumn<Semester>[]>(() => [
  {
    accessorKey: "name",
    header: t("table.column.name"),
  },
  {
    accessorKey: "description",
    header: t("table.column.description"),
    meta: {
      class: {
        td: "max-w-40 text-ellipsis overflow-hidden",
      },
    },
  },
  {
    id: "actions",
  },
]);

const permissions = {
  view: user.hasPermission("university.view_semester"),
  delete: user.hasPermission("university.delete_semester"),
  change: user.hasPermission("university.change_semester"),
};

definePageMeta({
  permission: "university.view_semester",
});
</script>
<template>
  <div class="flex gap-2">
    <PermissionGuard permission="university.add_semester">
      <UButton to="/semesters/create" :label="$t('button.create')" />
    </PermissionGuard>
  </div>
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
            api: { delete: remove },
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
