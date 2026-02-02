// export const useOnboarding = () => {
//   const store = useOnboardingStore();
//   const router = useRouter();

//   const steps = [
//     { id: "profile", label: "User Profile", component: "StepProfile" },
//     {
//       id: "university",
//       label: "University Details",
//       component: "StepUniversity",
//     },
//     { id: "faculties", label: "Initial Faculties", component: "StepFaculties" },
//     { id: "finish", label: "Ready!", component: "StepDone" },
//   ];

//   const currentStepIndex = computed(() =>
//     steps.findIndex((s) => s.id === store.store.currentStepId),
//   );

//   const goToNext = async () => {
//     const nextStep = steps[currentStepIndex.value + 1];
//     if (nextStep) {
//       store.setStep(nextStep.id);
//     } else {
//       await completeOnboarding();
//     }
//   };

//   const completeOnboarding = async () => {
//     store.markAsFinished();
//     router.push("/");
//   };

//   return { steps, currentStepIndex, goToNext, store };
// };

// features/first-setup/useOnboarding.ts
export const useOnboarding = () => {
  const store = useOnboardingStore();
  const router = useRouter();
  const toast = useToast();

  const steps = [
    { id: "profile", label: "User Profile", icon: "lucide:user", index: 1 },
    {
      id: "university",
      label: "University",
      icon: "lucide:building-2",
      index: 2,
    },
    { id: "faculties", label: "Faculties", icon: "lucide:book-open", index: 3 },
    { id: "positions", label: "Positions", icon: "lucide:briefcase", index: 4 },
    { id: "finish", label: "Complete", icon: "lucide:check-circle", index: 5 },
  ];

  const currentStepIndex = computed(() =>
    steps.findIndex((s) => s.id === store.currentStepId),
  );

  const canGoBack = computed(() => currentStepIndex.value > 0);
  const canGoNext = computed(() => currentStepIndex.value < steps.length - 1);

  const goToNext = async () => {
    const nextStep = steps[currentStepIndex.value + 1];
    if (nextStep) {
      store.setStep(nextStep.id);
    } else {
      await completeOnboarding();
    }
  };

  const goToPrevious = () => {
    if (canGoBack.value) {
      const prevStep = steps[currentStepIndex.value - 1];

      if (!prevStep) return;
      store.setStep(prevStep.id);
    }
  };

  const goToStep = (stepId: string) => {
    const stepIndex = steps.findIndex((s) => s.id === stepId);
    if (stepIndex !== -1 && stepIndex <= currentStepIndex.value) {
      store.setStep(stepId);
    }
  };

  const completeOnboarding = async () => {
    store.markAsFinished();
    toast.add({
      title: "Setup complete!",
      description: "Your university is ready to use.",
      color: "success",
    });
    await router.push("/");
  };

  const saveAndExit = async () => {
    store.cancelOnboarding();
    toast.add({
      title: "Progress saved",
      description: "You can resume setup anytime.",
      color: "info",
    });
    await router.push("/");
  };

  const resumeOnboarding = () => {
    if (store.canResume) {
      router.push("/getting-started");
    }
  };

  return {
    steps,
    currentStepIndex,
    canGoBack,
    canGoNext,
    goToNext,
    goToPrevious,
    goToStep,
    completeOnboarding,
    saveAndExit,
    resumeOnboarding,
    store,
  };
};
