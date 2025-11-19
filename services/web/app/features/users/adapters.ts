import type { UserHeader } from "~/api/csv-import";
import {
  LecturerCreateSchema,
  StudentCreateSchema,
  type UserCreate,
} from "~/api/schemas";

export const userHeaderUserAdapter = (header: UserHeader): UserCreate => {
  if (header.userType === "lecturer") {
    return LecturerCreateSchema.parse({
      email: header.email,
      avatar: header.avatar,
      faculty: header.faculty,
      position: header.position,
      status: header.status,
    });
  } else if (header.userType === "student") {
    return StudentCreateSchema.parse({
      email: header.email,
      avatar: header.avatar,
      indexNumber: header.indexNumber,
      fieldOfStudy: header.fieldOfStudy,
      yearOfStudy: Number(header.yearOfStudy),
      semester: header.semester,
      faculty: header.faculty,
    });
  } else {
    throw new Error(`Unknown user type: ${header.userType}`);
  }
};
