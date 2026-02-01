<script setup lang="ts">
const { t } = useI18n();
const { hasPermission } = useUserStore();
const route = useLocaleRoute();

// Fetch data
const { data: courses, isLoading: loadingCourses } = useCourses();
const { data: courseGroups, isLoading: loadingGroups } = useCourseGroups();
const { data: classes, isLoading: loadingClasses } = useClasses();
const { data: faculties, isLoading: loadingFaculties } = useFaculties();

// Stats
const stats = computed(() => ({
  courses: courses.value?.results.length || 0,
  courseGroups: courseGroups.value?.results.length || 0,
  faculties: faculties.value?.results.length || 0,
  todayClasses:
    classes.value?.results.filter(
      (c) => c.date_held === new Date().toISOString().split("T")[0],
    ).length || 0,
}));

// Today's classes
const todayClasses = computed(() => {
  const today = new Date().toISOString().split("T")[0];
  return (
    classes.value?.results.filter((c) => c.date_held === today).slice(0, 5) ||
    []
  );
});

// Upcoming classes (next 7 days)
const upcomingClasses = computed(() => {
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

  return (
    classes.value?.results
      ?.filter((c) => {
        const classDate = new Date(c.date_held);
        return classDate > today && classDate <= nextWeek;
      })
      .sort(
        (a, b) =>
          new Date(a.date_held).getTime() - new Date(b.date_held).getTime(),
      )
      .slice(0, 5) || []
  );
});

const quickActions = computed(() =>
  [
    hasPermission("teaching.add_course") && {
      label: t("dashboard.quickActions.createCourse"),
      icon: "i-lucide-book-plus",
      to: route({ name: "courses-create" })?.path,
    },
    hasPermission("teaching.add_coursegroup") && {
      label: t("dashboard.quickActions.createGroup"),
      icon: "i-lucide-users-round",
      to: route({ name: "course-groups-create" })?.path,
    },
    hasPermission("teaching.view_schedule") && {
      label: t("dashboard.quickActions.viewSchedule"),
      icon: "i-lucide-calendar-days",
      to: route({ name: "harmonogram" })?.path,
    },
    hasPermission("users.add_user") && {
      label: t("dashboard.quickActions.inviteEmployee"),
      icon: "i-lucide-user-plus",
      to: route({ name: "employees" })?.path,
    },
  ].filter(truthy),
);

// Recent activity (mock data - replace with real API)
const recentActivity = ref([
  {
    id: 1,
    icon: "i-lucide-book-open",
    description: t("dashboard.activity.courseCreated", {
      name: "Advanced Algorithms",
    }),
    time: "2 hours ago",
  },
  {
    id: 2,
    icon: "i-lucide-users",
    description: t("dashboard.activity.groupUpdated", { name: "CS-101-A" }),
    time: "5 hours ago",
  },
  {
    id: 3,
    icon: "i-lucide-calendar-check",
    description: t("dashboard.activity.classScheduled"),
    time: "1 day ago",
  },
]);

const formatTime = (time: string) => {
  return time?.slice(0, 5) || "";
};

definePageMeta({
  permission: "teaching.view_schedule",
});
</script>

<template>
  <div class="space-y-6">
    <!-- Welcome Header -->
    <div>
      <h1 class="text-3xl font-bold">
        {{ t("dashboard.welcome") }}
      </h1>
      <p class="text-muted-foreground mt-1">
        {{ t("dashboard.subtitle") }}
      </p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-muted-foreground">
              {{ t("dashboard.stats.courses") }}
            </p>
            <p class="text-2xl font-bold mt-1">
              {{ loadingCourses ? "..." : stats.courses }}
            </p>
          </div>
          <UIcon name="i-lucide-book-open" class="size-8 text-primary" />
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-muted-foreground">
              {{ t("dashboard.stats.groups") }}
            </p>
            <p class="text-2xl font-bold mt-1">
              {{ loadingGroups ? "..." : stats.courseGroups }}
            </p>
          </div>
          <UIcon name="i-lucide-users" class="size-8 text-blue-500" />
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-muted-foreground">
              {{ t("dashboard.stats.faculties") }}
            </p>
            <p class="text-2xl font-bold mt-1">
              {{ loadingFaculties ? "..." : stats.faculties }}
            </p>
          </div>
          <UIcon name="i-lucide-building" class="size-8 text-green-500" />
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-muted-foreground">
              {{ t("dashboard.stats.todayClasses") }}
            </p>
            <p class="text-2xl font-bold mt-1">
              {{ loadingClasses ? "..." : stats.todayClasses }}
            </p>
          </div>
          <UIcon
            name="i-lucide-calendar-check"
            class="size-8 text-purple-500"
          />
        </div>
      </UCard>
    </div>

    <!-- Quick Actions -->
    <div>
      <h2 class="text-xl font-semibold mb-4">
        {{ t("dashboard.quickActions.title") }}
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <UButton
          v-for="action in quickActions"
          :key="action.label"
          :to="action.to"
          color="neutral"
          variant="outline"
          block
          class="justify-start"
        >
          <UIcon :name="action.icon" class="mr-2 size-5" />
          {{ action.label }}
        </UButton>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Today's Schedule -->
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">
              {{ t("dashboard.todaySchedule.title") }}
            </h3>
            <UButton
              v-if="hasPermission('teaching.view_schedule')"
              :to="route({ name: 'harmonogram' })?.path"
              variant="ghost"
              size="xs"
            >
              {{ t("button.viewAll") }}
              <UIcon name="i-lucide-arrow-right" class="ml-1" />
            </UButton>
          </div>
        </template>

        <div v-if="loadingClasses" class="space-y-3">
          <USkeleton v-for="i in 3" :key="i" class="h-16" />
        </div>

        <div v-else-if="todayClasses.length" class="space-y-3">
          <div
            v-for="cls in todayClasses"
            :key="cls.id"
            class="flex items-start justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
          >
            <div class="flex-1">
              <p class="font-medium">
                {{ cls.course_group || "N/A" }}
              </p>
              <p class="text-sm text-muted-foreground">
                {{ formatTime(cls.start_time) }} -
                {{ formatTime(cls.end_time) }}
                <span v-if="cls.room">• {{ cls.room }}</span>
              </p>
            </div>
            <UBadge variant="subtle">
              {{ cls.status }}
            </UBadge>
          </div>
        </div>

        <div v-else class="text-center py-12">
          <UIcon
            name="i-lucide-calendar-x"
            class="size-12 text-muted-foreground mx-auto mb-2"
          />
          <p class="text-muted-foreground">
            {{ t("dashboard.todaySchedule.noClasses") }}
          </p>
        </div>
      </UCard>

      <!-- Upcoming Classes -->
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">
              {{ t("dashboard.upcomingClasses.title") }}
            </h3>
          </div>
        </template>

        <div v-if="loadingClasses" class="space-y-3">
          <USkeleton v-for="i in 3" :key="i" class="h-16" />
        </div>

        <div v-else-if="upcomingClasses.length" class="space-y-3">
          <div
            v-for="cls in upcomingClasses"
            :key="cls.id"
            class="flex items-start justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
          >
            <div class="flex-1">
              <p class="font-medium">
                {{ cls.course_group || "N/A" }}
              </p>
              <p class="text-sm text-muted-foreground">
                {{ new Date(cls.date_held).toLocaleDateString() }}
                • {{ formatTime(cls.start_time) }} -
                {{ formatTime(cls.end_time) }}
              </p>
            </div>
            <UBadge variant="subtle">
              {{ cls.status }}
            </UBadge>
          </div>
        </div>

        <div v-else class="text-center py-12">
          <UIcon
            name="i-lucide-calendar-clock"
            class="size-12 text-muted-foreground mx-auto mb-2"
          />
          <p class="text-muted-foreground">
            {{ t("dashboard.upcomingClasses.noClasses") }}
          </p>
        </div>
      </UCard>
    </div>

    <!-- Recent Activity -->
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold">
          {{ t("dashboard.recentActivity.title") }}
        </h3>
      </template>

      <div class="space-y-3">
        <div
          v-for="activity in recentActivity"
          :key="activity.id"
          class="flex items-start gap-3 pb-3 border-b last:border-b-0"
        >
          <div class="p-2 bg-muted rounded-lg">
            <UIcon :name="activity.icon" class="size-4 text-muted-foreground" />
          </div>
          <div class="flex-1">
            <p class="text-sm">{{ activity.description }}</p>
            <p class="text-xs text-muted-foreground mt-1">
              {{ activity.time }}
            </p>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Getting Started Card (for new users) -->
    <UCard
      v-if="stats.courses === 0 && stats.courseGroups === 0"
      class="bg-primary/5"
    >
      <div class="flex flex-col md:flex-row items-center gap-6">
        <div class="flex-shrink-0">
          <UIcon name="i-lucide-rocket" class="size-16 text-primary" />
        </div>
        <div class="flex-1 text-center md:text-left">
          <h3 class="text-xl font-semibold mb-2">
            {{ t("dashboard.gettingStarted.title") }}
          </h3>
          <p class="text-muted-foreground mb-4">
            {{ t("dashboard.gettingStarted.description") }}
          </p>
          <UButton
            :to="route({ name: 'getting-started' })?.path"
            color="primary"
          >
            {{ t("dashboard.gettingStarted.button") }}
            <UIcon name="i-lucide-arrow-right" class="ml-2" />
          </UButton>
        </div>
      </div>
    </UCard>
  </div>
</template>
