import type { Position } from "~/lib/api/schemas";
import { createFactory } from "./factory-builder";
import { faker } from "@faker-js/faker";

export const workloads = [20, 30, 40] as const;

export const createPosition = createFactory<Position>((overrides = {}) => {
  const position: Position = {
    id: faker.number.int(),
    name: faker.person.jobTitle(),
    hourly_rate: faker.number.int({ min: 80, max: 160 }),
    workload: faker.helpers.arrayElement(workloads),
  };

  return Object.assign(position, overrides);
});
