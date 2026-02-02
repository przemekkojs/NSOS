import type { Lecturer, LecturerCreate } from "~/lib/api/schemas";
import { apiFactory } from "../utils";

export const lecturerApi = apiFactory<Lecturer, LecturerCreate>({
  basePath: "/api/users/lecturers",
});
