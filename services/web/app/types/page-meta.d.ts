import type { Permission } from "~/lib/api/schemas";

declare module "nuxt/app" {
  export interface PageMeta {
    permission?: Permission;
    auth?: boolean;
  }
}
