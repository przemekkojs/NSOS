<script setup lang="ts">
import { useTableActions } from "~/composables/useTableActions";
import InviteModal from "~/features/users/components/InviteModal.vue";
import type { TableColumn } from "@nuxt/ui";
import { useCreateUser, useUsers } from "~/composables/api/useUsers";
import { UserCreateSchema, type User } from "~/lib/api/schemas";
import { userHeaderUserAdapter } from "~/features/users/adapters";
import type { UserHeader } from "~/lib/api/csv-import";
import CSVImport from "~/components/forms/CSVImport.vue";

const { data, isFetching } = useUsers();
const { mutate: create } = useCreateUser();

const getDropdownActions = useTableActions();
const { isEnabled } = useFeatureFlagsStore();
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

const inviteModalOpen = ref(false);
defineShortcuts({
  i: () => {
    inviteModalOpen.value = !inviteModalOpen.value;
  },
});

function onImported(importedData: UserHeader[]) {
  const adaptedData = importedData.map(userHeaderUserAdapter);
  for (const adaptedDataItem of adaptedData) {
    create(adaptedDataItem);
  }
}

definePageMeta({
  permission: "users.view_user",
});
</script>
<template>
  <div class="flex justify-between">
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
    <div class="flex gap-2">
      <PermissionGuard permission="users.add_user">
        <InviteModal v-model:open="inviteModalOpen" />
      </PermissionGuard>
      <PermissionGuard permission="users.add_user">
        <!-- @vue-generic {UserHeader} -->
        <CSVImport
          v-if="isEnabled('csvImport')"
          sample-href="/samples/users-example.csv"
          :schema="UserCreateSchema"
          @proceed="onImported"
        />
      </PermissionGuard>
    </div>
  </div>
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
