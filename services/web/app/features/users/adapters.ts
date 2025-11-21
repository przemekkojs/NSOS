import type { UserHeader } from "~/lib/api/csv-import";
import {
  LecturerCreateSchema,
  StudentCreateSchema,
  type UserCreate,
} from "~/lib/api/schemas";

export const userHeaderUserAdapter = (header: UserHeader): UserCreate => {
  if (header.userType === "lecturer") {
    return LecturerCreateSchema.parse({
      username: header.email.split("@")[0],
      password: "alaksdjfklajsdf",
      email: header.email,
      avatar: header.avatar,
      faculty: 1 || header.faculty,
      position: 1 || header.position,
      status: "active" ?? header.status,
    });
  } else if (header.userType === "student") {
    return StudentCreateSchema.parse({
      username: header.email.split("@")[0],
      password: "alaksdjfklajsdf",
      email: header.email,
      avatar: header.avatar,
      index_number: header.indexNumber.toString(),
      field_of_study: header.fieldOfStudy,
      year_of_study: Number(header.yearOfStudy),
      semester: header.semester,
      faculty: 1 || header.faculty,
    });
  } else {
    throw new Error(`Unknown user type: ${header.userType}`);
  }
};
