import { useRouter } from "@typed-router";
import { useClipboard } from "@vueuse/core";
import type { DropdownMenuItem } from "@nuxt/ui";
import { useI18n } from "vue-i18n";
import type { MutateFunction } from "@tanstack/vue-query";

export function useTableActions() {
  const toast = useToast();
  const router = useRouter();
  const { t } = useI18n();
  const { copy } = useClipboard();

  function getDropdownActions(row: {
    id: number;
    view?: MaybeRefOrGetter<boolean>;
    change?: MaybeRefOrGetter<boolean>;
    delete?: MaybeRefOrGetter<boolean>;
    api?: { delete: MutateFunction<unknown, Error, number> };
  }): DropdownMenuItem[][] {
    row.view ??= false;
    row.change ??= false;
    row.delete ??= false;

    const manageGroup: DropdownMenuItem[] = [
      row.view && {
        label: t("table.action.viewDetails"),
        icon: "i-lucide-eye",
        onSelect: () => {
          router.push({
            path: router.currentRoute.value.path + "/" + row.id,
          });
        },
      },
      row.change && {
        label: t("button.edit"),
        icon: "i-lucide-edit",
        onSelect: () => {
          router.push({
            path: router.currentRoute.value.path + "/" + row.id + "/edit",
          });
        },
      },
      row.delete && {
        label: t("button.delete"),
        icon: "i-lucide-trash",
        color: "error" as const,
        onSelect: () => {
          row.api?.delete(row.id);
          toast.add({
            title: "Delete action selected",
            color: "warning",
            icon: "i-lucide-alert-circle",
          });
        },
      },
    ].filter(truthy);

    return [
      [
        {
          label: t("table.action.copyId"),
          icon: "i-lucide-copy",
          onSelect: () => {
            copy(row.id.toString());

            toast.add({
              title: "Lecturer ID copied to clipboard!",
              color: "success",
              icon: "i-lucide-circle-check",
            });
          },
        },
      ],
      manageGroup,
    ];
  }

  return getDropdownActions;
}
