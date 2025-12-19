<script setup lang="ts" generic="TRow extends unknown = unknown">
import * as z from "zod";

const props = defineProps<{
  label?: string;
  sampleHref?: string;
  schema: z.ZodObject;
}>();
const emit = defineEmits<{
  (e: "proceed", res: TRow[]): void;
}>();
const open = ref(false);
const toast = useToast();
const { t } = useI18n();

async function handleFileUpload(file: File | null | undefined) {
  if (!file) return;

  const data = await parseCSV<TRow>(file);

  const rowSchema = z.array(props.schema).min(1);
  const parsedResult = rowSchema.safeParse(data);

  if (parsedResult.success) {
    toast.add({
      title: t("feature.csv.success"),
      color: "success",
    });
  } else {
    toast.add({
      title: t("feature.csv.importValidationFailed"),
      description: parsedResult.error.message,
      color: "error",
    });

    if (import.meta.dev) {
      console.error(parsedResult.error.message);
    }
    return;
  }

  open.value = false;
  toast.add({
    title: t("feature.csv.success"),
    description: t("feature.csv.successDescription"),
    color: "success",
  });
  emit("proceed", data);
}
</script>
<template>
  <UModal v-model:open="open">
    <UButton
      :label="$t('feature.csv.import')"
      trailing-icon="i-lucide-file-up"
    />
    <template #body>
      <UForm>
        <UFileUpload
          accept=".csv"
          :label="props.label ?? $t('feature.csv.dropFile')"
          @update:model-value="handleFileUpload"
        />
      </UForm>
    </template>
    <template v-if="sampleHref" #footer>
      <a
        :href="sampleHref"
        download
        :title="$t('feature.csv.downloadTemplate')"
        class="bg-primary px-4 py-1 rounded-sm mx-auto"
      >
        {{ $t("feature.csv.downloadTemplate") }}
      </a>
    </template>
  </UModal>
</template>
