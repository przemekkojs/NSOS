<script setup lang="ts">
import { useTableActions } from "~/composables/useTableActions";
import type { TableColumn } from "@nuxt/ui";
import type { CourseGroup } from "~/lib/api/schemas";

const { data, isFetching } = useCourseGroups();

const { t } = useI18n();
const getDropdownActions = useTableActions();

const columns = computed<TableColumn<CourseGroup>[]>(() => [
  { accessorKey: "name", header: t("table.column.name") },
  {
    accessorKey: "ects",
    header: t("table.column.ects"),
  },
  {
    accessorKey: "semester",
    header: t("table.column.semester"),
  },
  {
    id: "actions",
  },
]);

const user = useUserStore();
const permissions = {
  view: user.hasPermission("teaching.view_course"),
  delete: user.hasPermission("teaching.delete_class"),
  change: user.hasPermission("teaching.change_class"),
};

definePageMeta({
  permission: "teaching.view_coursegroup",
});
</script>
<template>
  <PermissionGuard permission="teaching.add_coursegroup">
    <div class="flex gap-2">
      <UButton to="/course-groups/create" :label="$t('button.create')" />
    </div>
  </PermissionGuard>
  <UTable :data="data?.results" :loading="isFetching" :columns>
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
          :aria-label="$t('table.ariaLabel.actionsMenu')"
        />
      </UDropdownMenu>
    </template>
  </UTable>
</template>
