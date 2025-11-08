<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import type { Faculty } from "~/lib/api/schemas";

const { t } = useI18n();
const { data, isFetching } = useFaculties();
const user = useUserStore();
const getDropdownActions = useTableActions();

const columns = computed<TableColumn<Faculty>[]>(() => [
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
  view: user.hasPermission("university.view_faculty"),
  delete: user.hasPermission("university.delete_faculty"),
  change: user.hasPermission("university.change_faculty"),
};

definePageMeta({
  permission: "university.view_faculty",
});
</script>
<template>
  <div class="flex gap-2">
    <PermissionGuard permission="university.add_faculty">
      <UButton to="/faculties/create" :label="$t('button.create')" />
    </PermissionGuard>
  </div>
  <UTable ref="table" :data="data ?? []" :loading="isFetching" :columns sticky>
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
