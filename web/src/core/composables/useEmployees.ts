import { useAPIFetch } from '../lib/sdk'
import type { Lecturer } from '../types'

interface UseEmployeesOptions {
  /**
   * Whether to fetch data immediately
   * @default true
   */
  immediate?: boolean
  queryParams?: Record<string, string>
}

export const useLecturers = (options: UseEmployeesOptions = {}) => {
  const lecturers = useAPIFetch('/users?kind=lecturer', {
    immediate: options.immediate ?? true,
  }).json<Lecturer[]>()

  const invite = async (email: string): Promise<void> => {
    await useAPIFetch('/users/invite', {
      method: 'POST',
      body: JSON.stringify({
        email,
      }),
    })
  }

  return {
    lecturers,
    invite,
  }
}
