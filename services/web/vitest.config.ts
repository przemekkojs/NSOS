import { defineConfig } from "vitest/config";
import { defineVitestProject } from "@nuxt/test-utils/config";

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: "unit",
          include: ["test/unit/*.{test,spec}.ts"],
          environment: "node",
        },
      },
      await defineVitestProject({
        test: {
          name: "nuxt",
          setupFiles: ["./test/nuxt/setup.ts"],
          exclude: [
            "**/e2e/**",
            "**/node_modules/**",
            "**/.nuxt/**",
            "**/coverage/**",
            "**/*.config.ts",
          ],
          include: [
            "app/**/*.nuxt.{test,spec}.ts",
            "test/nuxt/**/*.{test,spec}.ts",
          ],
          environment: "nuxt",
        },
      }),
    ],
    coverage: {
      provider: "v8",
      enabled: true,
      reporter: ["text", "json", "html"],
    },
  },
});
