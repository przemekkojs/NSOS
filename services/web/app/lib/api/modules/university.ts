import type { UniversityCreate, University } from "~/lib/api/schemas";
import { apiFactory } from "../utils";

export const universityApi = apiFactory<University, UniversityCreate>({
  basePath: "/api/university/universities",
});
