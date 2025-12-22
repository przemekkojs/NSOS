import * as z from "zod";
import { defineStore } from "pinia";

export const A11ySchema = z.object({
  fontScale: z.literal([1.0, 1.125, 1.25, 1.375, 1.5]),
  lineHeight: z.literal(["compact", "normal", "relaxed", "loose"]),
  tooltipDuration: z.literal(["short", "normal", "long", "persistent"]),
  colorBlindMode: z.literal([
    "none",
    "protanopia",
    "deuteranopia",
    "tritanopia",
    "monochrome",
  ]),
  reduceMotion: z.boolean(),
  disableAnimations: z.boolean(),
  announcements: z.boolean(),
});

export const fontScales = A11ySchema.def.shape.fontScale.values;
export const lineHeights = A11ySchema.def.shape.lineHeight.values;
export const tooltipDurations = A11ySchema.def.shape.tooltipDuration.values;
export const colorBlindModes = A11ySchema.def.shape.colorBlindMode.values;

export type A11y = z.infer<typeof A11ySchema>;

const defaultA11y: A11y = {
  // Visual settings
  fontScale: 1.0,
  lineHeight: "normal",

  // Motion & Animation
  reduceMotion: false,
  disableAnimations: false,

  // Interaction
  tooltipDuration: "normal",
  announcements: true,

  // Colors
  colorBlindMode: "none",
};

export const useA11yStore = defineStore(
  "a11y",
  () => {
    const state = ref<A11y>(defaultA11y);
    const fontScale = useCssVar("--font-scale", document.documentElement, {
      initialValue: defaultA11y.fontScale.toString(),
    });

    watch(
      state,
      (newValue) => {
        fontScale.value = newValue.fontScale.toString();
      },
      { deep: true }
    );

    return {
      state,
    };
  },
  {
    storage: "localStorage",
  }
);
