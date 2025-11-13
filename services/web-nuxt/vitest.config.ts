import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  test: {
    environment: "nuxt",
    globals: true,
    setupFiles: ["./test/setup.ts"],
    environmentOptions: {
      nuxt: {
        domEnvironment: "happy-dom",
      },
    },
    exclude: [
      "**/e2e/**",
      "**/node_modules/**",
      "**/.nuxt/**",
      "**/coverage/**",
    ],
    include: [
      "**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
      "!**/node_modules/**",
    ],
  },
});
