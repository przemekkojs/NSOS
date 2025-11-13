// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/test-utils",
    "@nuxt/ui",
    "@nuxt/scripts",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "nuxt-typed-router",
  ],
  runtimeConfig: {
    public: {
      mswEnabled: process.env.NUXT_PUBLIC_MSW_ENABLED === "true",
      apiGatewayUrl: process.env.NUXT_PUBLIC_API_GATEWAY_URL,
    },
  },
  css: ["~/assets/css/main.css", "~/assets/css/fullcalendar.css"],
  i18n: {
    locales: [
      {
        code: "pl",
        name: "Polski",
        file: "pl.json",
      },
      {
        code: "en",
        name: "English",
        file: "en.json",
      },
    ],
    defaultLocale: "pl",
  },
  vite: {
    server: {
      headers: {
        // "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
        // "Cross-Origin-Embedder-Policy": "credentialless",
      },
    },
    optimizeDeps: {
      include: [
        "@vue/devtools-core",
        "@vue/devtools-kit",

        "msw/browser",
        "msw",
        "@faker-js/faker",

        "@nuxt/ui/locale",
        "@nuxt/ui/runtime/utils/ai.js",
        "@tanstack/vue-query",
        "zod",
        "papaparse",
        "@fullcalendar/vue3",
        "@fullcalendar/daygrid",
        "@fullcalendar/interaction",
        "marked",
        "dompurify",
      ],
    },
  },
});
