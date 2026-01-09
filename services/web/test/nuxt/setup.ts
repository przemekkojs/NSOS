import { vi } from "vitest";
import { config } from "@vue/test-utils";

config.global.mocks = {
  $t: (key: string) => key,
  $18n: {
    locale: "en",
    t: (key: string) => key,
  },
};

vi.mock("vue-i18n", () => ({
  useI18n: () => ({
    t: (key: string) => key,
    locale: { value: "en" },
    createI18n: vi.fn(),
  }),
}));
