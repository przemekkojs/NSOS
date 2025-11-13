// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  // Your custom configs here
  {
    rules: {
      "vue/no-multiple-template-root": "off",
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
