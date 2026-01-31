import { faker } from "@faker-js/faker";
import { createFactory } from "./factory-builder";

export interface University {
  id: number;
  name: string;
}

export const createInstitution = createFactory<University>((overrides = {}) => {
  const university: University = {
    id: faker.number.int(),
    name: faker.company.name(),
  };

  return Object.assign(university, overrides);
});
