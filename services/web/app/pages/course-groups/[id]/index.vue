<script setup lang="ts">
const router = useRouter();
// @ts-expect-error id exists here as well
const id = computed(() => Number(router.currentRoute.value.params.id));
const { data } = useCourseGroup(id);
definePageMeta({
  permission: "teaching.view_coursegroup",
});
</script>
<template>
  <pre>{{ data }}</pre>
</template>
