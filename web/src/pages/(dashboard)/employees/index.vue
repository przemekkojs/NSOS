<script setup lang="ts">
import { useTableActions } from '@/core/composables/useTableActions'
import { useAPIFetch } from '@/core/lib/sdk'
import type { Lecturer } from '@/core/types'
import type { TableColumn } from '@nuxt/ui'

const { data: rawData, isFetching } = useAPIFetch('/users?kind=lecturer').json<Lecturer[]>()

const getDropdownActions = useTableActions()

const columns: TableColumn<Lecturer>[] = [
  { accessorKey: 'id', header: '#', cell: ({ row }) => `#${row.getValue('id')}` },
  { accessorKey: 'email', header: 'Email' },
  {
    accessorKey: 'faculty.name',
    header: 'Faculty',
    cell: ({ row }) => row.original.faculty.name,
  },
  {
    accessorKey: 'position.name',
    header: 'Position',
    cell: ({ row }) => row.original.position.name,
  },
  {
    id: 'actions',
  },
]
</script>
<template>
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
