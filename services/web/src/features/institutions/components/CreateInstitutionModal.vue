<script setup lang="ts">
import CreateInstitutionForm from '@/features/institutions/components/CreateInstitutionForm.vue'
import type { CreateInstitutionDto } from '../schemas'
import { useCreateInstitution } from '@/core/composables/useInstitutions'

const { mutate } = useCreateInstitution()
const open = ref(false)
const toast = useToast()

function onCreate(value: CreateInstitutionDto) {
  open.value = false
  toast.add({
    title: 'Institution created',
    description: `Institution ${value.name} has been created successfully.`,
    color: 'success',
  })

  mutate(value)
}
</script>
<template>
  <UModal
    v-model:open="open"
    :title="$t('page.institution.create.title')"
    :description="$t('page.institution.create.description')"
  >
    <UButton>{{ $t('button.create') }}</UButton>
    <template #body>
      <CreateInstitutionForm @success="onCreate" @cancel="open = false" />
    </template>
  </UModal>
</template>
