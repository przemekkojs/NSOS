<script setup lang="ts">
import * as marked from "marked";
import DOMPurify from "dompurify";

defineProps<{ content: string }>();

const sanitize = (text: string) => {
  const rawMarkup = marked.parse(text, { async: false });
  const cleanMarkup = DOMPurify.sanitize(rawMarkup, {
    USE_PROFILES: { html: true },
  });
  return cleanMarkup;
};
</script>
<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div v-html="sanitize(content)" />
</template>
