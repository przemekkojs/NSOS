import type { Lecturer } from '@/core/types'
import { createFaculty } from './faculties'
import { createPosition } from './positions'
// TODO: move type definition somewhere else

export const lecturers: Lecturer[] = [
  {
    id: 1,
    email: 'john.doe@example.com',
    faculty: createFaculty(),
    position: createPosition(),
    status: 'active',
  },
]
