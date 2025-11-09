<script setup lang="ts">
import type { NSOSNotification } from '@/features/notifications/useNotifications'
import type { DropdownMenuItem, TableColumn } from '@nuxt/ui'
import { useStorage } from '@vueuse/core'

const notifications = useStorage<NSOSNotification[]>('notifications', [])

const columns: TableColumn<NSOSNotification>[] = [
  { accessorKey: 'id', header: '#', cell: ({ row }) => `#${row.getValue('id')}` },
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'message', header: 'Message' },
  { accessorKey: 'timestamp', header: 'Timestamp' },
  { accessorKey: 'priority', header: 'Priority' },
  { accessorKey: 'read', header: 'Read', cell: ({ row }) => (row.getValue('read') ? 'Yes' : 'No') },
  {
    id: 'actions',
  },
]

function getDropdownActions(notification: NSOSNotification): DropdownMenuItem[] {
  return [
    {
      label: 'Mark as Read',
      icon: 'i-lucide-check-circle',
      onSelect(e) {
        e.stopPropagation()
        notification.read = true
      },
    },
    {
      label: 'Delete',
      icon: 'i-lucide-trash-2',
      onSelect(e) {
        e.stopPropagation()
        const index = notifications.value.findIndex((n) => n.id === notification.id)
        if (index !== -1) {
          notifications.value.splice(index, 1)
        }
      },
    },
  ]
}
</script>
<template>
  <h1>Inbox</h1>
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
