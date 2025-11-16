<script setup lang="ts">
import { useTableActions } from "~/composables/useTableActions";
import InviteModal from "~/features/users/components/InviteModal.vue";
import type { TableColumn } from "@nuxt/ui";
import CSVImport from "~/components/CSVImport.vue";
import { useCreateUser, useUsers } from "~/composables/useUsers";
import type { User } from "~/api/schemas";
import { userHeaderUserAdapter } from "~/features/users/adapters";
import type { UserHeader } from "~/features/users/schemas";

const { data, isFetching } = useUsers();
const { mutate: create } = useCreateUser();
const { hasPermission } = useUserStore();

const getDropdownActions = useTableActions();
const { t } = useI18n();

const columns = computed<TableColumn<User>[]>(() => [
  { accessorKey: "email", header: t("table.column.email") },
  {
    accessorKey: "faculty.name",
    header: t("table.column.name"),
  },
  {
    accessorKey: "position.name",
    header: t("table.column.position"),
  },
  {
    id: "actions",
  },
]);

const columnFilters = ref([
  {
    id: "email",
    value: "",
  },
]);

const table = useTemplateRef("table");

function onImported(importedData: UserHeader[]) {
  const adaptedData = importedData.map(userHeaderUserAdapter);
  create(adaptedData);
}
</script>
<template>
  <div class="flex gap-2">
    <InviteModal v-if="hasPermission('users.add_user')" />
    <!-- @vue-generic {UserHeader} -->
    <CSVImport v-if="hasPermission('users.add_user')" @proceed="onImported" />
  </div>
  <UInput
    :model-value="
      table?.tableApi.getColumn('email')?.getFilterValue() as string
    "
    class="max-w-sm"
    :placeholder="$t('form.placeholder.filterEmails')"
    @update:model-value="
      table?.tableApi?.getColumn('email')?.setFilterValue($event)
    "
  />
  <UTable
    ref="table"
    v-model:column-filters="columnFilters"
    :data="data ?? []"
    :loading="isFetching"
    :columns
    sticky
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
