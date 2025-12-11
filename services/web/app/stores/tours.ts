interface UserTours {
  onboardingCompleted: boolean;
  inviteLecturersCompleted: boolean;
}

export const useUserToursStore = defineStore("user-tours", {
  state: (): UserTours => ({
    onboardingCompleted: false,
    inviteLecturersCompleted: false,
  }),
  actions: {
    completeOnboarding() {
      this.onboardingCompleted = true;
    },
  },
  storage: "localStorage",
});
