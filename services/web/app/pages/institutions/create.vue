<script setup lang="ts">
definePageMeta({
  // @ts-expect-error TODO: change when institution backend is added
  permission: "university.add_institution",
});
</script>
<template>
  <p>Create new institution</p>
</template>
