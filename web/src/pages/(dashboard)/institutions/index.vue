<script setup lang="ts">
import { useTableActions } from '@/core/composables/useTableActions'
import CreateInstitutionModal from '@/features/institutions/components/CreateInstitutionModal.vue'
import { useInstitutions } from '@/features/institutions/composables/useInstitutions'
// TODO: replace with correct Institution type when available
import type { Institution } from '@/mocks/fixtures/institutions'
import type { TableColumn } from '@nuxt/ui'

const { institutions } = useInstitutions()
const { data, isFetching } = toRefs(institutions)
const getDropdownActions = useTableActions()
const { t, locale } = useI18n()

const columns = computed<TableColumn<Institution>[]>(() => [
  { accessorKey: 'name', header: t('table.header.name') },
  { accessorKey: 'address', header: t('table.header.address') },
  {
    id: 'actions',
  },
])
</script>
<template>
  <div class="flex gap-2">
    <CreateInstitutionModal />
  </div>
  <UTable :key="locale" :data="data ?? []" :loading="isFetching" :columns>
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
