import { describe, it, expect } from "vitest";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";

mockNuxtImport("useRuntimeConfig", () => {
  return {
    public: {
      featureFlags: {
        "example-flag": false,
      },
    },
  };
});

describe.skip("useFeatureFlags", () => {
  it('disables feature when not set to "true"', () => {
    const abc = useFeatureFlagsStore();

    expect(abc.isEnabled("notifications")).toBe(false);
  });

  it('enables feature when set to "true"', () => {
    const abc = useFeatureFlagsStore();

    expect(abc.isEnabled("notifications")).toBe(true);
  });

  it("disallows overriding flags at runtime when not in DEV", () => {
    const abc = useFeatureFlagsStore();

    expect(abc.overrideFlag("notifications", true)).toBeUndefined();
  });
});
