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
      email: header.email,
      password: "alaksdjfklajsdf",
      avatar: header.avatar,
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
    });
  } else {
    throw new Error(`Unknown user type: ${header.userType}`);
  }
};
