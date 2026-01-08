<script setup lang="ts">
import { useRoute } from "@typed-router";
import { mapContentNavigation } from "@nuxt/ui/utils/content";
import { findPageBreadcrumb } from "@nuxt/content/utils";

const route = useRoute();

const { data: navigation } = await useAsyncData("docs-nav", () => {
  return queryCollectionNavigation("help");
});

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("help").path(route.path).first();
});

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings("help", route.path);
});

const breadcrumb = computed(() =>
  mapContentNavigation(
    findPageBreadcrumb(navigation?.value, page.value?.path, {
      indexAsChild: true,
    })
  ).map(({ icon, ...link }) => link)
);

definePageMeta({
  layout: "auth",
  auth: false,
});

const tocLinks = computed(() => page.value?.body.toc?.links);
</script>
<template>
  <UPage>
    <template #left>
      <UPageAside>
        <UContentNavigation :navigation :collapsible="false" />
      </UPageAside>
    </template>

    <UPageHeader v-bind="page">
      <template #headline>
        <UBreadcrumb :items="breadcrumb" />
      </template>
    </UPageHeader>
    <UPageBody>
      <ContentRenderer v-if="page" :value="page" class="nuxt-content" />

      <USeparator />

      <UContentSurround :surround="surround" />
    </UPageBody>

    <template #right>
      <UContentToc :links="tocLinks" />
    </template>
  </UPage>
</template>
