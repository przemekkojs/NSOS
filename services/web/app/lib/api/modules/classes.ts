import type { Class, ClassCreate } from "../schemas";
import { apiFactory } from "../utils";

export const classApi = apiFactory<Class, ClassCreate>({
  basePath: "/api/teaching/classes",
});
