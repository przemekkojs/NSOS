import type { User } from '@/features/auth/stores/user-store'

export const users: User[] = [
  {
    id: 1,
    name: 'John',
    role: 'admin',
  },
  {
    id: 2,
    name: 'Jane',
    role: 'student',
  },
]

export const user: User = users[0]!
