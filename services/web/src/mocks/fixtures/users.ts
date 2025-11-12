import type { User } from '@/core/types'
import { createFactory } from './factory-builder'
import { faker } from '@faker-js/faker'

const roles = ['admin', 'employee', 'student'] as const

export const createUsers = createFactory<User>((overrides = {}) => {
  const user: User = {
    id: faker.number.int(),
    email: faker.internet.email(),
    role: faker.helpers.arrayElement(roles),
    avatar: faker.image.avatar(),
  }

  return Object.assign(user, overrides)
})
