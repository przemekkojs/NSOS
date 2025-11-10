import type { User } from '@/features/auth/stores/user-store'
import { createFactory } from './factory-builder'
import { faker } from '@faker-js/faker'

const roles = ['admin', 'employee', 'student'] as const

export const createUsers = createFactory<User>((overrides = {}) => {
  const user: User = {
    id: faker.number.int(),
    name: faker.person.fullName(),
    // email: faker.internet.email(),
    role: faker.helpers.arrayElement(roles),
  }

  return Object.assign(user, overrides)
})
