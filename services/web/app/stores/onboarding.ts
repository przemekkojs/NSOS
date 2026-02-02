import { defineStore } from "pinia";

export interface OnboardingState {
  currentStepId: string;
  isFinished: boolean;
  profileData: {
    firstName?: string;
    lastName?: string;
    email?: string;
  } | null;
  universityId: number | null;
  facultyIds: number[];
  positionIds: number[];
  semesterIds: number[];
  startedAt: string | null;
  lastUpdatedAt: string | null;
}

export const useOnboardingStore = defineStore(
  "onboarding",
  () => {
    // State
    const currentStepId = ref<string>("profile");
    const isFinished = ref<boolean>(false);
    const profileData = ref<OnboardingState["profileData"]>(null);
    const universityId = ref<number | null>(null);
    const facultyIds = ref<number[]>([]);
    const positionIds = ref<number[]>([]);
    const semesterIds = ref<number[]>([]);
    const startedAt = ref<string | null>(null);
    const lastUpdatedAt = ref<string | null>(null);

    // Getters
    const hasStarted = computed(() => startedAt.value !== null);
    const canResume = computed(() => hasStarted.value && !isFinished.value);
    const progress = computed(() => {
      const steps = [
        "profile",
        "university",
        "faculties",
        "positions",
        "finish",
      ];
      return steps.indexOf(currentStepId.value) + 1;
    });

    const $reset = () => {
      currentStepId.value = "profile";
      isFinished.value = false;
      profileData.value = null;
      universityId.value = null;
      facultyIds.value = [];
      positionIds.value = [];
      semesterIds.value = [];
      startedAt.value = null;
      lastUpdatedAt.value = null;
    };

    // Actions
    function startOnboarding() {
      startedAt.value = new Date().toISOString();
      lastUpdatedAt.value = new Date().toISOString();
      currentStepId.value = "profile";
    }

    function setStep(stepId: string) {
      currentStepId.value = stepId;
      lastUpdatedAt.value = new Date().toISOString();
    }

    function setProfileData(data: OnboardingState["profileData"]) {
      profileData.value = data;
      lastUpdatedAt.value = new Date().toISOString();
    }

    function setUniversityId(id: number) {
      universityId.value = id;
      lastUpdatedAt.value = new Date().toISOString();
    }

    function addFacultyId(id: number) {
      if (!facultyIds.value.includes(id)) {
        facultyIds.value.push(id);
        lastUpdatedAt.value = new Date().toISOString();
      }
    }

    function addPositionId(id: number) {
      if (!positionIds.value.includes(id)) {
        positionIds.value.push(id);
        lastUpdatedAt.value = new Date().toISOString();
      }
    }

    function addSemesterId(id: number) {
      if (!semesterIds.value.includes(id)) {
        semesterIds.value.push(id);
        lastUpdatedAt.value = new Date().toISOString();
      }
    }

    function markAsFinished() {
      isFinished.value = true;
      lastUpdatedAt.value = new Date().toISOString();
    }

    function reset() {
      currentStepId.value = "profile";
      isFinished.value = false;
      profileData.value = null;
      universityId.value = null;
      facultyIds.value = [];
      positionIds.value = [];
      semesterIds.value = [];
      startedAt.value = null;
      lastUpdatedAt.value = null;
    }

    function cancelOnboarding() {
      lastUpdatedAt.value = new Date().toISOString();
    }

    return {
      // State
      currentStepId,
      isFinished,
      profileData,
      universityId,
      facultyIds,
      positionIds,
      semesterIds,
      startedAt,
      lastUpdatedAt,

      // Getters
      hasStarted,
      canResume,
      progress,

      // Actions
      startOnboarding,
      setStep,
      setProfileData,
      setUniversityId,
      addFacultyId,
      addPositionId,
      addSemesterId,
      markAsFinished,
      cancelOnboarding,
      reset,
      $reset,
    };
  },
  {
    storage: "localStorage",
  },
);
