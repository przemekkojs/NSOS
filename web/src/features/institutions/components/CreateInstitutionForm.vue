<script setup lang="ts">
import {
  createInstitutionSchema,
  type CreateInstitutionSchema,
} from '@/features/institutions/schemas'

defineEmits<{
  (e: 'success', institution: CreateInstitutionSchema): void
  (e: 'cancel'): void
}>()

const state = reactive<Partial<CreateInstitutionSchema>>({})
</script>
<template>
  <UForm
    :schema="createInstitutionSchema"
    :state
    @submit="$emit('success', $event)"
    class="space-y-2"
  >
    <UFormField :label="$t('institution.fields.name')" name="name">
      <UInput v-model="state.name" />
    </UFormField>
    <UFormField :label="$t('institution.fields.code')" name="code">
      <UInput v-model="state.code" />
    </UFormField>
    <UFormField :label="$t('institution.fields.address')" name="address">
      <UInput v-model="state.address" />
    </UFormField>
    <div class="flex gap-2">
      <UButton type="submit">{{ $t('institution.create.submit') }}</UButton>
      <UButton @click="$emit('cancel')">{{ $t('common.cancel') }}</UButton>
    </div>
  </UForm>
</template>
