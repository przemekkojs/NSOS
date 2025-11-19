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

definePageMeta({
  permission: "teaching.view_course",
});
</script>
<template>
  <UTable :data="data" :loading="isFetching" :columns>
    <template #actions-cell="{ row }">
      <UDropdownMenu :items="getDropdownActions(row.original)">
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
