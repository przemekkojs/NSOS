<script setup lang="ts">
import { useInviteUser } from "~/composables/useUsers";
import { inviteUsersSchema, type InviteUsersDto } from "../schemas";
import type { FormSubmitEvent } from "@nuxt/ui";
import * as z from "zod";

const open = ref(false);

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

function clearForm() {
  state.emails = [];
  searchTerm.value = "";
  items.value = [];
}

const toast = useToast();
const { t } = useI18n();

const { mutateAsync: invite } = useInviteUser();

async function onSubmit(event: FormSubmitEvent<InviteUsersDto>) {
  const emails = event.data.emails;
  await invite(emails);

  console.info("Invited emails:", emails);

  open.value = false;
  toast.add({
    title: t("message.success.inviteSent"),
    description: emails.join(", "),
    color: "success",
  });
  setTimeout(() => {
    clearForm();
  }, 200);
}
</script>
<template>
  <UModal v-model:open="open">
    <UButton
      id="invite-employee-button"
      :label="$t('button.invite')"
      trailing-icon="i-lucide-user-plus"
    />
    <template #content>
      <UForm
        class="p-4 space-y-4"
        :schema="inviteUsersSchema"
        :state
        @submit.stop.prevent="onSubmit"
      >
        <UFormField id="invite-employee-field" label="Emails" name="email">
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
            @keydown.tab.prevent.stop="onCreate(searchTerm)"
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
  </UModal>
</template>
