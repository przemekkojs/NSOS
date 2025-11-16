import { faker } from '@faker-js/faker'
import { createFactory } from './factory-builder'

export interface Institution {
  id: number
  name: string
}

export const createInsitution = createFactory<Institution>((overrides = {}) => {
  const institution: Institution = {
    id: faker.number.int(),
    name: faker.company.name(),
  }

  return Object.assign(institution, overrides)
})
