<script setup lang="ts">
import {
  type Position,
  PositionCreateSchema,
  type PositionCreate,
} from "~/lib/api/schemas";

const props = defineProps<{
  isEdit?: boolean;
  initialData?: Position;
}>();

defineEmits<{
  (e: "success", data: PositionCreate): void;
  (e: "cancel"): void;
}>();

const WORKLOAD_OPTIONS = [
  { value: 40, label: "Full (40h)" },
  { value: 30, label: "Three quarter (30h)" },
  { value: 20, label: "Half (20h)" },
];

console.info("initial", JSON.stringify(props.initialData));

const state = ref<Partial<PositionCreate>>({
  name: props.initialData?.name || "",
  hourly_rate: props.initialData?.hourly_rate || undefined,
  workload: props.initialData?.workload || 40,
});
</script>

<template>
  <UForm
    :schema="PositionCreateSchema"
    :state="state"
    class="flex flex-col gap-4"
    @submit="$emit('success', state as PositionCreate)"
  >
    <UFormField :label="$t('form.label.name')" name="name" required>
      <UInput
        v-model="state.name"
        class="w-full"
        :placeholder="$t('form.placeholder.positionName')"
      />
    </UFormField>

    <UFormField
      :label="$t('form.label.hourlyRate')"
      name="hourly_rate"
      required
    >
      <UInput
        v-model="state.hourly_rate"
        type="number"
        step="1"
        class="w-full"
        :placeholder="$t('form.placeholder.hourlyRate')"
      />
    </UFormField>

    <UFormField :label="$t('form.label.workload')" name="workload" required>
      <USelect
        v-model="state.workload"
        :items="WORKLOAD_OPTIONS"
        option-attribute="label"
        value-attribute="value"
        class="w-full"
      />
    </UFormField>

    <div class="flex gap-2 justify-end mt-4">
      <UButton
        type="button"
        color="neutral"
        variant="outline"
        @click="$emit('cancel')"
      >
        {{ $t("button.cancel") }}
      </UButton>
      <UButton type="submit" class="text-white">
        {{ isEdit ? $t("button.update") : $t("button.create") }}
      </UButton>
    </div>
  </UForm>
</template>
