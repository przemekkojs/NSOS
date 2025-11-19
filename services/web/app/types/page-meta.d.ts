import type { Permission } from "~/api/schemas";

declare module "nuxt/app" {
  export interface PageMeta {
    permission?: Permission;
  }
}
