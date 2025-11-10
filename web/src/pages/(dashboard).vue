<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { useNotifications } from '@/features/notifications/useNotifications'
import ChatSlideover from '@/core/components/ChatSlideover.vue'
import LocaleSelect from '@/core/components/ui/LocaleSelect.vue'
import TeamsMenu from '@/core/components/TeamsMenu.vue'
import UserMenu from '@/core/components/UserMenu.vue'
import NotificationsSlideover from '@/core/NotificationsSlideover.vue'

const toast = useToast()
const open = ref(true)
const { t } = useI18n()
const { unreadCount } = useNotifications()

const setOpen = (value: boolean) => {
  return () => {
    open.value = value
  }
}

const links = computed<NavigationMenuItem[][]>(() => [
  [
    {
      label: t('dashboard.nav.dashboard'),
      icon: 'i-lucide-layout-dashboard',
      to: '/',
      onSelect: setOpen(false),
    },
    {
      label: t('dashboard.nav.harmonogram'),
      icon: 'i-lucide-calendar',
      to: '/harmonogram',
      onSelect: setOpen(false),
    },
    {
      label: t('dashboard.nav.employees'),
      icon: 'i-lucide-users',
      to: '/employees',
      onSelect: setOpen(false),
    },
    {
      label: t('dashboard.nav.institutions'),
      icon: 'i-lucide-building-2',
      to: '/institutions',
      onSelect: setOpen(false),
    },
    {
      label: t('dashboard.nav.subjects'),
      icon: 'i-lucide-book-open',
      to: '/subjects',
      onSelect: setOpen(false),
    },
    {
      label: t('dashboard.nav.inbox'),
      icon: 'i-lucide-inbox',
      to: '/inbox',
      badge: unreadCount.value > 0 ? unreadCount.value.toString() : undefined,
      onSelect: setOpen(false),
    },
    {
      label: t('dashboard.nav.settings'),
      to: '/settings',
      icon: 'i-lucide-settings',
    },
  ],
  [
    {
      label: t('dashboard.nav.feedback'),
      icon: 'i-lucide-message-circle',
      to: '/feedback',
      target: '_blank',
    },
    {
      label: t('dashboard.nav.help'),
      icon: 'i-lucide-info',
      to: 'http://localhost:5174/',
      target: '_blank',
    },
  ],
])

const groups = computed(() => [
  {
    id: 'links',
    label: 'Go to',
    items: links.value.flat(),
  },
  {
    id: 'code',
    label: 'Code',
    items: [
      {
        id: 'source',
        label: 'View page source',
        icon: 'simple-icons:github',
        to: `https://github.com/przemekkojs/NSOS`,
        target: '_blank',
      },
    ],
  },
])

// const items = [
//   [
//     {
//       label: 'New mail',
//       icon: 'i-lucide-send',
//       to: '/inbox',
//     },
//     {
//       label: 'New employee',
//       icon: 'i-lucide-user-plus',
//       to: '/customers',
//     },
//   ],
// ] satisfies DropdownMenuItem[][]

const cookie = useStorage('cookie-consent', 'pending')
if (cookie.value !== 'accepted') {
  toast.add({
    title: 'We use first-party cookies to enhance your experience on our website.',
    duration: 0,
    close: false,
    actions: [
      {
        label: 'Accept',
        color: 'neutral',
        variant: 'outline',
        onClick: () => {
          cookie.value = 'accepted'
        },
      },
      {
        label: 'Opt out',
        color: 'neutral',
        variant: 'ghost',
      },
    ],
  })
}
</script>
<template>
  <UDashboardGroup unit="rem" storage="local">
    <UDashboardSidebar
      id="default"
      v-model:open="open"
      collapsible
      resizable
      class="bg-elevated/25"
      :ui="{ footer: 'lg:border-t lg:border-default' }"
    >
      <template #header="{ collapsed }">
        <TeamsMenu :collapsed="collapsed" />
      </template>

      <template #default="{ collapsed }">
        <UDashboardSearchButton :collapsed="collapsed" class="bg-transparent ring-default" />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[0]"
          orientation="vertical"
          tooltip
          popover
        />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[1]"
          orientation="vertical"
          tooltip
          class="mt-auto"
        />
      </template>

      <template #footer="{ collapsed }">
        <UserMenu :collapsed="collapsed" />
      </template>
    </UDashboardSidebar>

    <UDashboardSearch :groups="groups" />

    <UDashboardPanel>
      <template #header>
        <UDashboardNavbar :ui="{ right: 'gap-3' }">
          <template #leading>
            <UDashboardSidebarCollapse />
          </template>

          <template #right>
            <ChatSlideover />
            <UTooltip :text="$t('notifications.tooltip')" :shortcuts="['N']">
              <UButton color="neutral" variant="ghost" square>
                <UChip color="error" inset>
                  <UIcon name="i-lucide-bell" class="size-5 shrink-0" />
                </UChip>
              </UButton>
            </UTooltip>
            <UColorModeButton />
            <LocaleSelect />
            <!-- <UDropdownMenu :items="items">
              <UButton icon="i-lucide-plus" size="md" class="rounded-full" />
            </UDropdownMenu> -->
          </template>
        </UDashboardNavbar>
      </template>

      <template #body>
        <RouterView />
      </template>
    </UDashboardPanel>
    <NotificationsSlideover />
  </UDashboardGroup>
</template>
