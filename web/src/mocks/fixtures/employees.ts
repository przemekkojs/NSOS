import type { Lecturer } from '@/core/types'
import { faculties } from './faculties'
import { positions } from './positions'
// TODO: move type definition somewhere else

export const lecturers: Lecturer[] = [
  {
    id: 1,
    email: 'john.doe@example.com',
    faculty: faculties[0]!,
    position: positions[0]!,
    status: 'active',
  },
]
