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
      "no-restricted-globals": [
        "error",
        {
          name: "useRouter",
          message: 'Import useRouter from "@typed-router" for type safety.',
        },
        {
          name: "useRoute",
          message: 'Import useRoute from "@typed-router" for type safety.',
        },
        {
          name: "navigateTo",
          message: 'Import navigateTo from "@typed-router" for type safety.',
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["#app", "vue-router"],
              importNames: ["useRoute", "useRouter", "navigateTo"],
              message:
                "Please use @typed-router for routing-related composables and functions.",
            },
          ],
        },
      ],
    },
  }
);
