<script setup lang="ts">
import { ref, computed } from 'vue'
import { ConfigProvider } from 'reka-ui'
import { useStorage } from '@vueuse/core'
import type { NavigationMenuItem } from '@nuxt/ui'
import { useRoute } from 'vue-router'

const toast = useToast()
const open = ref(true)
const route = useRoute()

const setOpen = (value: boolean) => {
  return () => {
    open.value = value
  }
}

const links = [
  [
    {
      label: 'Home',
      icon: 'i-lucide-house',
      to: '/',
      onSelect: setOpen(false),
    },
    {
      label: 'Harmonogram',
      icon: 'i-lucide-calendar',
      to: '/calendar',
      onSelect: setOpen(false),
    },
    {
      label: 'Users',
      icon: 'i-lucide-users',
      to: '/users',
      defaultOpen: true,
      type: 'trigger',
      children: [
        {
          label: 'Employees',
          to: '/employees',
          onSelect: setOpen(false),
        },
        {
          label: 'Students',
          to: '/students',
          onSelect: setOpen(false),
        },
      ],
    },
    {
      label: 'Inbox',
      icon: 'i-lucide-inbox',
      to: '/inbox',
      badge: '4',
      onSelect: setOpen(false),
    },
    {
      label: 'Settings',
      to: '/settings',
      icon: 'i-lucide-settings',
      defaultOpen: true,
      type: 'trigger',
      children: [
        {
          label: 'General',
          to: '/settings',
          exact: true,
          onSelect: setOpen(false),
        },
        {
          label: 'Members',
          to: '/settings/members',
          onSelect: setOpen(false),
        },
        {
          label: 'Notifications',
          to: '/settings/notifications',
          onSelect: setOpen(false),
        },
        {
          label: 'Security',
          to: '/settings/security',
          onSelect: setOpen(false),
        },
      ],
    },
  ],
  [
    {
      label: 'Feedback',
      icon: 'i-lucide-message-circle',
      to: '/feedback',
      target: '_blank',
    },
    {
      label: 'Help & Support',
      icon: 'i-lucide-info',
      to: '/help',
      target: '_blank',
    },
  ],
] satisfies NavigationMenuItem[][]

const groups = computed(() => [
  {
    id: 'links',
    label: 'Go to',
    items: links.flat(),
  },
  {
    id: 'code',
    label: 'Code',
    items: [
      {
        id: 'source',
        label: 'View page source',
        icon: 'simple-icons:github',
        to: `https://github.com/nuxt-ui-templates/dashboard-vue/blob/main/src/pages${route.path === '/' ? '/index' : route.path}.vue`,
        target: '_blank',
      },
    ],
  },
])

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
  <ConfigProvider>
    <Suspense>
      <UApp>
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

          <RouterView />

          <NotificationsSlideover />
        </UDashboardGroup>
      </UApp>
    </Suspense>
  </ConfigProvider>
</template>
