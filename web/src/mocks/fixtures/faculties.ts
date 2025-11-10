import type { Faculty } from '@/core/types'
import { faker } from '@faker-js/faker'
import { createFactory } from './factory-builder'

export const createFaculty = createFactory<Faculty>((overrides = {}) => {
  const faculty: Faculty = {
    id: faker.number.int(),
    name: faker.company.name(),
    description: faker.lorem.sentence(),
  }

  return Object.assign(faculty, overrides)
})
