// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  debug: true,
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
    "@nuxt/test-utils/module",
  ],
  runtimeConfig: {
    public: {
      mswEnabled: process.env.NUXT_PUBLIC_MSW_ENABLED === "true",
      appUrl: process.env.NUXT_PUBLIC_APP_URL,
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
      featureFlags: {
        notifications:
          process.env.NUXT_PUBLIC_FEATURE_FLAG_NOTIFICATIONS === "true",
        aiChat: process.env.NUXT_PUBLIC_FEATURE_FLAG_AI_CHAT === "true",
        institutions:
          process.env.NUXT_PUBLIC_FEATURE_FLAG_INSTITUTIONS === "true",
        csvImport: process.env.NUXT_PUBLIC_FEATURE_FLAG_CSV_IMPORT === "true",
        userAvatars:
          process.env.NUXT_PUBLIC_FEATURE_FLAG_USER_AVATARS === "true",
      },
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "pl",
      },
      title: "NSOS - Nowoczesny System Obsługi Studiów",
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
      ],
      meta: [{ name: "theme-color", content: "#3b82f6" }],
    },
  },
  imports: {
    dirs: ["~/composables/**"],
  },
  css: [
    "~/assets/css/main.css",
    "~/assets/css/fullcalendar.css",
    "driver.js/dist/driver.css",
    "~/assets/css/driver-overrides.css",
  ],
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
    strategy: "prefix_except_default",
    defaultLocale: "pl",
  },
  vite: {
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
        "@fullcalendar/core",
        "@fullcalendar/daygrid",
        "@fullcalendar/interaction",
        "@fullcalendar/timegrid",
        "marked",
        "dompurify",
        "driver.js",
      ],
    },
  },
  ssr: false,
  nitro: {
    preset: "static",
    compressPublicAssets: {
      gzip: true,
      brotli: true,
    },
    prerender: {
      crawlLinks: true,
      routes: ["/"],
    },
  },
  routeRules: {
    "/help/**": { prerender: true },
    "/en/help/**": { prerender: true },
  },
});
