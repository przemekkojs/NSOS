<script setup lang="ts">
const { locale } = useI18n();

useHead({
  title: "NSOS",
  htmlAttrs: {
    lang: locale.value,
  },
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico",
    },
  ],
});

const config = useRuntimeConfig();
const siteUrl = config.public.appUrl;
const siteName = "NSOS";
const siteDescription =
  "Nowoczesny System Obsługi Studiów - zarządzanie kursami, planem zajęć i ocenami";

useSeoMeta({
  title: "NSOS - Nasz System Obsługi Studiów",
  description: siteDescription,
  ogTitle: siteName,
  ogDescription: siteDescription,
  ogImage: `${siteUrl}/og-image.png`,
  ogUrl: siteUrl,
  ogType: "website",
  twitterTitle: siteName,
  twitterDescription: siteDescription,
  twitterImage: `${siteUrl}/og-image.png`,
  twitterCard: "summary_large_image",
});
</script>
<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
