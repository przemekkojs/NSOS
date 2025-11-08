<script setup lang="ts">
import type { NSOSNotification } from "~/composables/api/useNotifications";
import type { DropdownMenuItem, TableColumn } from "@nuxt/ui";
import { useStorage } from "@vueuse/core";

const { t } = useI18n();
const notifications = useStorage<NSOSNotification[]>("notifications", []);

const columns = computed<TableColumn<NSOSNotification>[]>(() => [
  { accessorKey: "title", header: t("table.column.title") },
  { accessorKey: "message", header: t("table.column.message") },
  {
    accessorKey: "timestamp",
    header: t("table.column.date"),
    cell: ({ row }) => {
      return formatTime(new Date(row.getValue("timestamp")));
    },
  },
  { accessorKey: "priority", header: t("table.column.priority") },
  {
    accessorKey: "read",
    header: t("table.status.read"),
    cell: ({ row }) =>
      row.getValue("read") ? t("button.yes") : t("button.no"),
  },
  {
    id: "actions",
  },
]);

function getDropdownActions(
  notification: NSOSNotification
): DropdownMenuItem[] {
  return [
    {
      label: "Mark as Read",
      icon: "i-lucide-check-circle",
      onSelect(e) {
        e.stopPropagation();
        notification.read = true;
      },
    },
    {
      label: "Delete",
      icon: "i-lucide-trash-2",
      onSelect(e) {
        e.stopPropagation();
        const index = notifications.value.findIndex(
          (n) => n.id === notification.id
        );
        if (index !== -1) {
          notifications.value.splice(index, 1);
        }
      },
    },
  ];
}
</script>
<template>
  <UTable :data="notifications" :columns>
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
