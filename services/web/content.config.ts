import { defineContentConfig, defineCollection } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    help: defineCollection({
      type: "page",
      source: "content/help/**/*.md",
    }),
  },
});
