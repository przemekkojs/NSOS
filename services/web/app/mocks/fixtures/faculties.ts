import type { Faculty } from "~/lib/api/schemas";
import { faker } from "@faker-js/faker";
import { createFactory } from "./factory-builder";

const FACULTIES = [
  "Faculty of Biotechnology",
  "Faculty of Computer Science",
] as const;

export const createFaculty = createFactory<Faculty>((overrides = {}) => {
  const faculty: Faculty = {
    id: faker.number.int(),
    name: faker.helpers.arrayElement(FACULTIES),
    description: faker.lorem.sentence(),
  };

  return Object.assign(faculty, overrides);
});
