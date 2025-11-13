import { config } from "@vue/test-utils";

config.global.mocks = {
  $t: (key: string) => key,
  $18n: {
    locale: "en",
    t: (key: string) => key,
  },
};
