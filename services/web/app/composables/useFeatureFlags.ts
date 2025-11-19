import type { SharedPublicRuntimeConfig } from "#build/types/runtime-config";

type FeatureFlag = keyof SharedPublicRuntimeConfig["featureFlags"];

export function useFeatureFlags() {
  const config = useRuntimeConfig();
  const store = useSessionStorage<SharedPublicRuntimeConfig["featureFlags"]>(
    "feature-flags",
    config.public.featureFlags
  );

  const runtimeConfig = config.public.featureFlags;

  const isEnabled = (flag: FeatureFlag) => {
    return store.value[flag] ?? runtimeConfig[flag] ?? false;
  };

  return {
    runtimeConfig,
    store,
    isEnabled,
  };
}
