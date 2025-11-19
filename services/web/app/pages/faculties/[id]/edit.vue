<script setup lang="ts">
const { mutateAsync: edit } = useUpdateFaculty();

definePageMeta({
  permission: "university.change_faculty",
});
</script>
<template>
  <FacultyForm />
</template>
