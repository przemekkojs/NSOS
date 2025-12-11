<script setup lang="ts">
import UserForm from "~/features/users/components/UserForm.vue";
import { useRoute } from "@typed-router";

const params = useRoute("employees-id-edit").params;
const id = parseInt(params.id as string, 10);

const { data: user } = useUser(id);
const { mutateAsync: updateUser } = useUpdateUser();

// TODO: always allow changing self
definePageMeta({
  permission: "users.change_user",
});
</script>
<template>
  <h1>Profil</h1>
  <UserForm
    :initial-values="user"
    @submit="
      updateUser({
        id,
        data: $event,
      })
    "
  />
</template>
