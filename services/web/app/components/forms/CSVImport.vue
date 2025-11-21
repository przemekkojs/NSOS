<script setup lang="ts" generic="TRow extends unknown = unknown">
import * as z from "zod";

const props = defineProps<{
  label?: string;
  sampleHref?: string;
  schema?: z.ZodObject;
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

  if (!props.schema) return;

  const rowSchema = z.array(props.schema);
  const parseResult = rowSchema.safeParse(data);

  console.info(parseResult);

  if (data.length === 0) {
    toast.add({
      title: t("feature.csv.noRows"),
      description: undefined,
      color: "error",
    });
    return;
  }

  open.value = false;
  toast.add({
    title: t("feature.csv.success"),
    description: t("feature.csv.successDescription"),
    // description: `Successfully imported ${data.length} rows from CSV file.`,
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
