<script setup lang="ts">
import { useTableActions } from '@/core/composables/useTableActions'
import InviteModal from '@/features/users/components/InviteModal.vue'
import type { TableColumn } from '@nuxt/ui'
import CSVImport from '@/core/components/CSVImport.vue'
import { useCreateUser, useUsers } from '@/core/composables/useUsers'
import type { User } from '@/api/modules/user'
import { userHeaderUserAdapter } from '@/features/users/adapters'
import type { UserHeader } from '@/features/users/schemas'

const { data, isFetching } = useUsers()
const { mutate: create } = useCreateUser()

const getDropdownActions = useTableActions()
const { t } = useI18n()

const columns = computed<TableColumn<User>[]>(() => [
  { accessorKey: 'email', header: t('table.column.email') },
  {
    accessorKey: 'faculty.name',
    header: t('table.column.name'),
  },
  {
    accessorKey: 'position.name',
    header: t('table.column.position'),
  },
  {
    id: 'actions',
  },
])

function onImported(importedData: UserHeader[]) {
  const adaptedData = importedData.map(userHeaderUserAdapter)
  create(adaptedData)
}
</script>
<template>
  <div class="flex gap-2">
    <InviteModal />
    <!-- @vue-generic {UserHeader} -->
    <CSVImport @proceed="onImported" />
  </div>
  <UTable :data="data ?? []" :loading="isFetching" :columns>
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
