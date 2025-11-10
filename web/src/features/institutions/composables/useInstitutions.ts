import { useAPIFetch } from '@/core/lib/sdk'
import type { Institution } from '@/mocks/fixtures/institutions'
import type { CreateInstitutionSchema, UpdateInstitutionSchema } from '../schemas'

interface UseInstitutionsOtpions {
  immediate?: boolean
}

export const useInstitutions = (options: UseInstitutionsOtpions = {}) => {
  const institutions = useAPIFetch('/institutions', {
    immediate: options.immediate ?? true,
  }).json<Institution[]>()

  const create = async (data: CreateInstitutionSchema) => {
    const res = await useAPIFetch('/institutions', {
      method: 'POST',
      body: JSON.stringify(data),
    }).json<Institution>()

    const value = res.data.value

    if (value) {
      institutions.data.value?.push(value)
    }

    return res
  }

  const update = async (id: string, data: UpdateInstitutionSchema) => {
    const res = await useAPIFetch(`/institutions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })

    return res
  }

  return {
    institutions,
    create,
    update,
  }
}
