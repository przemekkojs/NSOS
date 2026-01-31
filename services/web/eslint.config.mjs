// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import pluginPlaywright from "eslint-plugin-playwright";

export default withNuxt(
  // Your custom configs here
  {
    ...pluginPlaywright.configs["flat/recommended"],
    files: ["e2e/**/*.{test,spec}.{js,ts,jsx,tsx}"],
  },
  {
    rules: {
      "vue/no-multiple-template-root": "off",
      "vue/multi-word-component-names": "off",
    },
  },
);
