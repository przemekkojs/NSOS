<script setup lang="ts">
import { useTableActions } from '@/core/composables/useTableActions'
import { useAPIFetch } from '@/core/lib/sdk'
// TODO: replace with correct Institution type when available
import type { Institution } from '@/mocks/fixtures/institutions'
import type { TableColumn } from '@nuxt/ui'

const { data: rawData, isFetching } = useAPIFetch('/institutions').json<Institution[]>()
const getDropdownActions = useTableActions()

const columns: TableColumn<Institution>[] = [
  { accessorKey: 'id', header: '#', cell: ({ row }) => `#${row.getValue('id')}` },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'address', header: 'Address' },
  {
    id: 'actions',
  },
]
</script>
<template>
  <h1>Institutions</h1>
  <UTable :data="rawData ?? []" :loading="isFetching" :columns>
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
