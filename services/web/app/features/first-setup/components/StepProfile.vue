<script setup lang="ts">
import * as z from "zod";

const emit = defineEmits<{
  success: [data: unknown];
}>();

const store = useOnboardingStore();
const userStore = useUserStore();
const toast = useToast();
const { mutateAsync: updateProfile, isPending } = useUpdateUser();

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});

const state = ref({
  firstName: store.profileData?.firstName || userStore.user?.first_name || "",
  lastName: store.profileData?.lastName || userStore.user?.last_name || "",
});

const handleSubmit = async () => {
  try {
    if (!userStore.user) {
      return;
    }
    const result = await updateProfile({
      id: userStore.user.id,
      data: {
        first_name: state.value.firstName,
        last_name: state.value.lastName,
      },
    });
    store.setProfileData(state.value);

    toast.add({
      title: "Profile updated",
      color: "success",
      icon: "lucide:check-circle",
    });

    emit("success", result);
  } catch (error) {
    toast.add({
      title: "Failed to update profile",
      // @ts-expect-error assume this works fine
      description: error.message,
      color: "error",
      icon: "lucide:alert-circle",
    });
  }
};
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-bold mb-2">
        {{ $t("onboarding.welcome") }}
      </h2>
      <p class="text-gray-600 dark:text-gray-400">
        {{ $t("onboarding.tellUsAboutYourself") }}
      </p>
    </div>

    <UAlert
      icon="lucide:user-circle"
      color="info"
      variant="soft"
      title="Complete your profile"
      description="This information will be visible to other users in your university."
    />

    <UForm
      :schema="schema"
      :state="state"
      class="space-y-4"
      @submit="handleSubmit"
    >
      <UFormField label="First Name" name="firstName" required>
        <UInput
          v-model="state.firstName"
          placeholder="John"
          icon="lucide:user"
          size="lg"
        />
      </UFormField>

      <UFormField label="Last Name" name="lastName" required>
        <UInput
          v-model="state.lastName"
          placeholder="Doe"
          icon="lucide:user"
          size="lg"
        />
      </UFormField>

      <UButton
        type="submit"
        size="lg"
        block
        :loading="isPending"
        trailing-icon="lucide:arrow-right"
      >
        {{ $t("common.continue") }}
      </UButton>
    </UForm>
  </div>
</template>
