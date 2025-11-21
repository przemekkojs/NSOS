import { faker } from "@faker-js/faker";
import { CourseSchema, type Course } from "~/lib/api/schemas";
import { createFactory } from "./factory-builder";
import { createFaculty } from "./faculties";

const COURSE_NAMES = ["ABC"];

const courseTypes = Array.from(CourseSchema.shape.course_type.values);

export const createCourses = createFactory<Course>((overrides = {}) => {
  const course: Course = {
    id: faker.number.int(),
    name: faker.helpers.arrayElement(COURSE_NAMES),
    weekly_hours: faker.number.int({
      min: 1,
      max: 6,
    }),
    weeks_count: faker.number.int({
      min: 7,
      max: 15,
    }),
    ects: faker.number.int({
      min: 0,
      max: 6,
    }),
    course_code: faker.string.alpha(6),
    course_group: faker.word.noun(),
    course_type: faker.helpers.arrayElement(courseTypes),
    faculty: createFaculty().id,
  };

  return Object.assign(course, overrides);
});
