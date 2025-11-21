<script setup lang="ts">
import { useInviteUser } from "~/composables/api/useUsers";
import type { InviteUsersDto } from "~/lib/api/schemas";
import * as z from "zod";
import { inviteUsersSchema } from "~/lib/api/schemas";
import type { FormSubmitEvent } from "@nuxt/ui";

const emit = defineEmits<{
  (e: "success"): void;
}>();

const state = reactive<InviteUsersDto>({
  emails: [],
});

const searchTerm = ref<string>("");
const items = ref<string[]>([]);

function onCreate(item: string) {
  if (!item) {
    return;
  }

  if (items.value.includes(item.trim())) {
    searchTerm.value = "";

    if (!state.emails?.includes(item.trim())) {
      state.emails?.push(item.trim());
    }
    return;
  }

  if (item.endsWith(",")) {
    item = item.slice(0, -1).trim();
  }

  const parsedItem = z.email().safeParse(item);

  if (!parsedItem.success) {
    return;
  }

  item = parsedItem.data;

  items.value.push(item);
  state.emails?.push(item);
  searchTerm.value = "";
}

async function onSubmit({ data }: FormSubmitEvent<InviteUsersDto>) {
  const emails = data.emails;
  await invite(emails);

  toast.add({
    title: t("message.success.inviteSent"),
    description: emails.join(", "),
    color: "success",
  });
  emit("success");
  setTimeout(() => {
    clearForm();
  }, 200);
}

function clearForm() {
  state.emails = [];
  searchTerm.value = "";
  items.value = [];
}

const toast = useToast();
const { t } = useI18n();

const { mutateAsync: invite } = useInviteUser();
</script>
<template>
  <UForm
    class="p-4 space-y-4"
    :schema="inviteUsersSchema"
    :state
    @submit="onSubmit"
  >
    <UFormField
      id="invite-employee-field"
      :label="$t('form.label.email', 2)"
      name="email"
    >
      <UInputMenu
        v-model="state.emails"
        v-model:search-term="searchTerm"
        multiple
        class="w-full"
        create-item
        placeholder="e.g. john.doe@mail.com"
        :items
        @create="onCreate"
        @change="onCreate(searchTerm)"
        @keydown.tab="onCreate(searchTerm)"
      />
    </UFormField>
    <UButton
      id="send-invitation-button"
      type="submit"
      color="primary"
      class="mt-4"
    >
      {{ $t("button.invite") }}
    </UButton>
  </UForm>
</template>
