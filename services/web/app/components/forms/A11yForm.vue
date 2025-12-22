<script setup lang="ts">
import type { SelectItem } from "@nuxt/ui";

const { t } = useI18n();
const { state } = useA11yStore();

function literalToSelectItems<T extends string | number>(
  literal: Set<T>
): SelectItem[] {
  return Array.from(literal).map((literalValue) => ({
    label: t(`form.selectItem.${literalValue}`),
    value: literalValue,
  }));
}

const fontScaleItems = computed<SelectItem[]>(() =>
  Array.from(fontScales).map(
    (fontScale) =>
      ({
        label: t(`form.selectItem.${fontScale.toString().replace(".", "")}`),
        value: fontScale,
      }) satisfies SelectItem
  )
);

const lineHeightItems = computed(() => literalToSelectItems(lineHeights));

const tooltipDurationItems = computed(() =>
  literalToSelectItems(tooltipDurations)
);

const colorblindModeItems = computed(() =>
  literalToSelectItems(colorBlindModes)
);
</script>
<template>
  <UForm :schema="A11ySchema" class="grid grid-cols-2 gap-4">
    <UFormField :label="$t('form.label.fontScale')">
      <USelect
        id="font-scale"
        v-model="state.fontScale"
        :items="fontScaleItems"
        class="max-w-60 w-full"
      />
    </UFormField>

    <UFormField :label="$t('form.label.lineHeight')">
      <USelect
        id="line-height"
        v-model="state.lineHeight"
        :items="lineHeightItems"
        class="max-w-60 w-full"
      />
    </UFormField>
    <UFormField :label="$t('form.label.tooltipDuration')">
      <USelect
        id="tooltip-duration"
        v-model="state.tooltipDuration"
        :items="tooltipDurationItems"
        class="max-w-60 w-full"
      />
    </UFormField>
    <UFormField :label="$t('form.label.colorBlindMode')">
      <USelect
        id="colorblind-mode"
        v-model="state.colorBlindMode"
        :items="colorblindModeItems"
        class="max-w-60 w-full"
      />
    </UFormField>

    <UFormField
      :label="$t('form.label.reduceMotion')"
      class="inline-flex gap-2 text-center"
    >
      <USwitch id="reduce-motion" v-model="state.reduceMotion" />
    </UFormField>
    <UFormField :label="$t('form.label.disableAnimations')">
      <USwitch id="disable-animation" v-model="state.disableAnimations" />
    </UFormField>
    <UFormField :label="$t('form.label.announcements')">
      <USwitch id="announcements" v-model="state.announcements" />
    </UFormField>
  </UForm>
</template>
