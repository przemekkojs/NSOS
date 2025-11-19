<script setup lang="ts">
import { FacultyCreateSchema, type FacultyCreate } from "~/api/schemas";

defineEmits<{
  (e: "submit", data: FacultyCreate): void;
}>();
</script>
<template>
  <Form
    :schema="FacultyCreateSchema"
    :button-label="$t('button.create')"
    @submit="$emit('submit', $event)"
  />
</template>
