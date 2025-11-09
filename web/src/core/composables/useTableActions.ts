import { useRouter } from 'vue-router'
import { useClipboard } from '@vueuse/core'
import type { DropdownMenuItem } from '@nuxt/ui'
import { useI18n } from 'vue-i18n'

export function useTableActions() {
  const toast = useToast()
  const router = useRouter()
  const { t } = useI18n()
  const { copy } = useClipboard()

  function getDropdownActions(row: { id: number }): DropdownMenuItem[][] {
    return [
      [
        {
          label: t('table.actions.copyId'),
          icon: 'i-lucide-copy',
          onSelect: () => {
            copy(row.id.toString())

            toast.add({
              title: 'Lecturer ID copied to clipboard!',
              color: 'success',
              icon: 'i-lucide-circle-check',
            })
          },
        },
      ],
      [
        {
          label: t('table.actions.viewDetails'),
          icon: 'i-lucide-eye',
          onSelect: () => {
            router.push({
              path: router.currentRoute.value.path + '/' + row.id,
            })
          },
        },
        {
          label: t('common.edit'),
          icon: 'i-lucide-edit',
          onSelect: () => {
            router.push({
              path: router.currentRoute.value.path + '/' + row.id + '/edit',
            })
          },
        },
        {
          label: t('common.delete'),
          icon: 'i-lucide-trash',
          color: 'error',
          onSelect: () => {
            toast.add({
              title: 'Delete action selected',
              color: 'warning',
              icon: 'i-lucide-alert-circle',
            })
          },
        },
      ],
    ]
  }

  return getDropdownActions
}
