<script setup lang="ts" generic="T extends string = string">
import type {
  FormFieldProps as UFormFieldProps,
  InputProps as UInputProps,
} from "@nuxt/ui";

export type FormFieldProps = Pick<
  UFormFieldProps,
  "name" | "error" | "label" | "required"
> &
  Pick<UInputProps, "id" | "placeholder" | "disabled" | "type">;

const model = defineModel<T>();

const { id, placeholder, disabled, ...props } = defineProps<FormFieldProps>();
</script>
<template>
  <UFormField v-bind="props">
    <UInput :id v-model="model" :placeholder :required :disabled :type />
  </UFormField>
</template>
