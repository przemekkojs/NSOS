<script setup lang="ts">
import { useTableActions } from "~/composables/useTableActions";
import { useCourses } from "~/composables/api/useCourses";
import type { TableColumn } from "@nuxt/ui";
import type { Course } from "~/lib/api/schemas";

const { data, isFetching } = useCourses();

const { t } = useI18n();
const getDropdownActions = useTableActions();

const columns = computed<TableColumn<Course>[]>(() => [
  { accessorKey: "name", header: t("table.column.name") },
  {
    accessorKey: "weeklyHours",
    header: t("table.column.weeklyHours"),
  },
  {
    accessorKey: "ects",
    header: t("table.column.ects"),
  },
  {
    accessorKey: "courseGroup",
    header: t("table.column.courseGroup"),
  },
  {
    accessorKey: "courseType",
    header: t("table.column.courseType"),
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
  permission: "teaching.view_course",
});
</script>
<template>
  <PermissionGuard permission="teaching.add_course">
    <div class="flex gap-2">
      <UButton to="/courses/create" :label="$t('button.create')" />
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
