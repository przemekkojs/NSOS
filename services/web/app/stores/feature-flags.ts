import type { SharedPublicRuntimeConfig } from "#build/types/runtime-config";

type FeatureFlagsConfig = SharedPublicRuntimeConfig["featureFlags"];
type FeatureFlag = keyof FeatureFlagsConfig;

export const useFeatureFlagsStore = defineStore(
  "feature-flags",
  () => {
    const runtimeConfig = useRuntimeConfig().public.featureFlags;

    const store = ref<FeatureFlagsConfig>(runtimeConfig);

    const isEnabled = (flag: FeatureFlag) => {
      return store.value[flag] ?? runtimeConfig[flag] ?? false;
    };

    /**
     * Override specific feature flag
     *
     * NOTE: only works in DEV mode
     */
    const overrideFlag = (
      flag: FeatureFlag,
      value: (typeof runtimeConfig)[FeatureFlag]
    ) => {
      if (!import.meta.dev) {
        console.warn(
          "Overriding feature flags at runtime only works in DEV mode."
        );
        return;
      }
      store.value[flag] = value;
    };
    return {
      runtimeConfig,
      isEnabled,
      overrideFlag,
    };
  },
  {
    storage: "sessionStorage",
  }
);
