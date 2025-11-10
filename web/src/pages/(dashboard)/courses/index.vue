<script setup lang="ts">
import { useTableActions } from '@/core/composables/useTableActions'
import { useCourses } from '@/core/composables/useCourses'
import type { Lecturer } from '@/core/types'
import type { TableColumn } from '@nuxt/ui'

// const { data: rawData, isFetching } = useAPIFetch('/users?kind=lecturer').json<Lecturer[]>()
const { data, isFetching } = useCourses()

const { t } = useI18n()
const getDropdownActions = useTableActions()

const columns = computed<TableColumn<Lecturer>[]>(() => [
  { accessorKey: 'name', header: t('table.header.name') },
  {
    accessorKey: 'weeklyHours',
    header: t('course.header.weeklyHours'),
  },
  {
    accessorKey: 'ects',
    header: t('course.header.ects'),
  },
  {
    accessorKey: 'courseGroup',
    header: t('course.header.courseGroup'),
  },
  {
    accessorKey: 'courseType',
    header: t('course.header.courseType'),
  },
  {
    id: 'actions',
  },
])
</script>
<template>
  <UTable :data="data" :loading="isFetching" :columns>
    <template #actions-cell="{ row }">
      <UDropdownMenu :items="getDropdownActions(row.original)">
        <UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost"
          :aria-label="$t('table.ariaLabel.actions')" />
      </UDropdownMenu>
    </template>
  </UTable>
</template>
