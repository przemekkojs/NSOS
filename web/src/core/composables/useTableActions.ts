import { useRouter } from 'vue-router'
import { useClipboard } from '@vueuse/core'
import type { DropdownMenuItem } from '@nuxt/ui'

export function useTableActions() {
  const toast = useToast()
  const router = useRouter()
  const { copy } = useClipboard()

  function getDropdownActions(row: { id: number }): DropdownMenuItem[][] {
    return [
      [
        {
          label: `Copy ID`,
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
          label: 'View Details',
          icon: 'i-lucide-eye',
          onSelect: () => {
            // Navigate to details page
            router.push({
              path: router.currentRoute.value.path + '/' + row.id,
            })
          },
        },
        {
          label: 'Edit',
          icon: 'i-lucide-edit',
          onSelect: () => {
            // Navigate to edit page
            router.push({
              path: router.currentRoute.value.path + '/' + row.id + '/edit',
            })
          },
        },
        {
          label: 'Delete',
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
