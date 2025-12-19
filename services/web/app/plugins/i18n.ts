import * as z from "zod";

declare module "zod" {
  interface GlobalMeta {
    error?: string;
  }
}

function hasMeta(inst: unknown): inst is { meta: () => object | undefined } {
  return (
    inst !== null &&
    typeof inst === "object" &&
    "meta" in inst &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof (inst as any).meta === "function"
  );
}

function getMetaLabel(issue: z.core.$ZodRawIssue): string | undefined {
  if (!issue.inst || !hasMeta(issue.inst)) {
    return;
  }

  const meta = issue.inst.meta();

  if (!meta) {
    return;
  }

  if ("error" in meta) {
    return (meta as { label?: string }).label;
  }
}

export default defineNuxtPlugin(() => {
  const nuxtApp = useNuxtApp();
  const locale = nuxtApp.$i18n.locale;

  z.config({
    customError(issue) {
      const { t, te } = nuxtApp.$i18n;

      const tKey = getMetaLabel(issue);

      if (!tKey || !te(tKey, locale.value)) {
        return this.localeError?.(issue);
      }

      return {
        message: t(tKey),
      };
    },
  });

  watch(
    locale,
    async (newLocale) => {
      const _locale = z.locales[newLocale as "pl" | "en"]();
      z.config(_locale);
    },
    {
      immediate: true,
    }
  );
});
