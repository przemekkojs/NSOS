<script setup lang="ts">
import { useUsers } from '@/core/composables/useUsers'
import type { FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

const open = ref(false)

const schema = z.object({
  emails: z.array(z.string()),
})

type InviteForm = z.output<typeof schema>

const state = reactive<InviteForm>({
  emails: [],
})

const searchTerm = ref<string>('')
const items = ref<string[]>([])

function onCreate(item: string) {
  items.value.push(item)
  state.emails?.push(item)
  searchTerm.value = ''
}

function clearForm() {
  state.emails = []
  searchTerm.value = ''
  items.value = []
}

const toast = useToast()
const { t } = useI18n()
const { invite } = useUsers()

async function onSubmit(event: FormSubmitEvent<InviteForm>) {
  event.preventDefault()
  await invite(state.emails)

  open.value = false
  toast.add({
    title: t('common.sendingInvitations'),
    description: state.emails.join(', '),
    color: 'success',
  })
  setTimeout(() => {
    clearForm()
  }, 200)
}
</script>
<template>
  <UModal v-model:open="open">
    <UButton :label="$t('invite')" trailing-icon="i-lucide-user-plus" />
    <template #content>
      <UForm class="p-4 space-y-4" @submit="onSubmit" :schema>
        <UFormField label="Email" name="email">
          <UInputMenu
            v-model="state.emails"
            v-model:search-term="searchTerm"
            multiple
            class="w-full"
            create-item
            placeholder="e.g. john.doe@mail.com"
            :items
            @create="onCreate"
          />
        </UFormField>
        <UButton type="submit" color="primary" class="mt-4">
          {{ $t('common.sendInvitation') }}
        </UButton>
      </UForm>
    </template>
  </UModal>
</template>
