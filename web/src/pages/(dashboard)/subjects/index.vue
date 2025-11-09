<script setup lang="ts">
import { useTableActions } from '@/core/composables/useTableActions'
import { useAPIFetch } from '@/core/lib/sdk'
import type { Lecturer } from '@/core/types'
import type { TableColumn } from '@nuxt/ui'
import { useI18n } from 'vue-i18n'

const { data: rawData, isFetching } = useAPIFetch('/users?kind=lecturer').json<Lecturer[]>()

const { t } = useI18n()
const getDropdownActions = useTableActions()

const columns: TableColumn<Lecturer>[] = [
  { accessorKey: 'email', header: t('table.header.email') },
  {
    accessorKey: 'faculty.name',
    header: t('table.header.faculty'),
  },
  {
    accessorKey: 'position.name',
    header: t('table.header.position'),
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
          :aria-label="$t('table.ariaLabel.actions')"
        />
      </UDropdownMenu>
    </template>
  </UTable>
</template>
