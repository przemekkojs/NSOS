<script setup lang="ts" generic="TRow extends unknown = unknown">
import { parseCSV } from '@/features/imports/utils'

const props = defineProps<{
  label?: string
}>()
const emit = defineEmits<{
  (e: 'proceed', res: TRow[]): void
}>()
const open = ref(false)
const toast = useToast()

async function handleFileUpload(file: File | null | undefined) {
  if (!file) return

  const data = await parseCSV<TRow>(file)
  open.value = false
  toast.add({
    title: 'CSV Imported',
    description: `Successfully imported ${data.length} rows from CSV file.`,
    color: 'success',
  })
  emit('proceed', data)
}
</script>
<template>
  <UModal v-model:open="open">
    <UButton :label="$t('feature.csv.import')" trailing-icon="i-lucide-file-up" />
    <template #body>
      <UForm>
        <UFileUpload
          @update:model-value="handleFileUpload"
          accpet=".csv"
          :label="props.label ?? $t('feature.csv.dropFile')"
        />
      </UForm>
    </template>
    <template #footer>
      <a
        href="/samples/users.example.csv"
        download
        :title="$t('feature.csv.downloadTemplate')"
        class="bg-primary px-4 py-1 rounded-sm mx-auto"
      >
        Or download a sample file first
      </a>
    </template>
  </UModal>
</template>
