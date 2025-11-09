<script setup lang="ts">
import { useTableActions } from '@/core/composables/useTableActions'
import { useAPIFetch } from '@/core/lib/sdk'
// TODO: replace with correct Institution type when available
import type { Institution } from '@/mocks/fixtures/institutions'
import type { TableColumn } from '@nuxt/ui'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { data: rawData, isFetching } = useAPIFetch('/institutions').json<Institution[]>()
const getDropdownActions = useTableActions()
const { t } = useI18n()

const columns = computed<TableColumn<Institution>[]>(() => [
  { accessorKey: 'name', header: t('table.header.name') },
  { accessorKey: 'address', header: t('table.header.address') },
  {
    id: 'actions',
  },
])
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
