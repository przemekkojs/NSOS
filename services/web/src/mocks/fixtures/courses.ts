import { faker } from '@faker-js/faker'
import type { Course } from '@/api/modules/courses'
import { createFactory } from './factory-builder'
import { courseTypes } from '@/api/modules/courses'

const COURSE_NAMES = ['ABC']

export const createCourses = createFactory<Course>((overrides = {}) => {
  const course: Course = {
    id: faker.number.int(),
    name: faker.helpers.arrayElement(COURSE_NAMES),
    weeklyHours: faker.number.int({
      min: 1,
      max: 6,
    }),
    weeksCount: faker.number.int({
      min: 7,
      max: 15,
    }),
    ects: faker.number.int({
      min: 0,
      max: 6,
    }),
    courseGroup: faker.word.noun(),
    courseType: faker.helpers.arrayElement(courseTypes),
    faculty: faker.number.int(),
  }

  return Object.assign(course, overrides)
})
