<script lang="ts">
import type * as z from "zod";
import type { FormFieldProps } from "./ui/FormVield.vue";

export type FieldOverrides<Schema extends z.ZodObject> = Partial<
  Record<keyof z.input<Schema>, Partial<FormFieldProps>>
>;
</script>
<script setup lang="ts" generic="Schema extends z.ZodObject">
type Input = z.input<Schema>;
type Output = z.output<Schema>;

const {
  schema,
  buttonLabel = undefined,
  initialValues = {},
  fieldOverrides = {},
} = defineProps<{
  schema: Schema;
  initialValues?: Partial<Input>;
  buttonLabel?: string;
  fieldOverrides?: FieldOverrides<Schema>;
}>();

const emit = defineEmits<{
  (e: "submit", data: Output): void;
}>();

defineSlots<{
  default(props: { state: Partial<Input> }): void;
  submit(): void;
}>();

const fields = computed<(keyof Input)[]>(() =>
  schema.keyof().options.filter((v) => v !== "id")
);
const state = ref<Partial<Input>>(initialValues);

watch(
  () => initialValues,
  (newValues) => {
    if (newValues && Object.keys(newValues).length > 0) {
      state.value = {
        ...state.value,
        ...newValues,
      };
    }
  },
  { immediate: true, deep: true }
);

async function onSubmit(data: Output) {
  emit("submit", data);
}
</script>
<template>
  <UForm
    class="p-4 space-y-4"
    :schema
    :state
    @submit.prevent="onSubmit($event.data)"
  >
    <slot v-for="field in fields" :name="field">
      <UFormField
        :label="$t(`form.label.${field}`)"
        :name="field"
        required
        v-bind="fieldOverrides[field]"
      >
        <UInput
          id="name"
          v-model="state[field]"
          :placeholder="$t(`form.placeholder.${field}`)"
          v-bind="fieldOverrides[field]"
        />
      </UFormField>
    </slot>
    <slot :state="unref(state)" />
    <slot name="submit">
      <UButton
        type="submit"
        color="primary"
        class="mt-4"
        :label="buttonLabel ?? $t('button.submit')"
      />
    </slot>
  </UForm>
</template>
