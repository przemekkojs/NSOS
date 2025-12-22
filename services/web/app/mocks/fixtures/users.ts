import type { User } from "~/lib/api/schemas";
import { permissions } from "~/lib/api/schemas";
import { createFactory } from "./factory-builder";
import { faker } from "@faker-js/faker";

export const createUsers = createFactory<User>((overrides = {}) => {
  const user: User = {
    id: faker.number.int(),
    email: faker.internet.email(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    is_active: true,
    is_staff: false,
    is_superuser: false,
    username: faker.internet.username(),
    date_joined: faker.date.past().toISOString(),
    groups: [],
    permissions: [...permissions],
  };

  return Object.assign(user, overrides);
});
