<script setup lang="ts">
import { useDashboard } from '@/core/composables/useDashboard'
import { formatTimeAgo } from '@vueuse/core'
import type { NSOSNotification } from '@/features/notifications/useNotifications'

const { isNotificationsSlideoverOpen } = useDashboard()

const notifications = ref<NSOSNotification[]>([])
</script>

<template>
  <USlideover v-model:open="isNotificationsSlideoverOpen" title="Notifications">
    <template #body>
      <RouterLink
        v-for="notification in notifications"
        :key="notification.id"
        :to="`/inbox?id=${notification.id}`"
        class="px-3 py-2.5 rounded-md hover:bg-elevated/50 flex items-center gap-3 relative -mx-3 first:-mt-3 last:-mb-3"
      >
        <UChip color="error" :show="!notification.read" inset>
          <UAvatar :src="notification.sender.avatar" :alt="notification.sender.email" size="md" />
        </UChip>

        <div class="text-sm flex-1">
          <p class="flex items-center justify-between">
            <time
              :datetime="notification.timestamp"
              class="text-muted text-xs"
              v-text="formatTimeAgo(new Date(notification.timestamp))"
            />
          </p>

          <p class="text-dimmed">
            {{ notification.message }}
          </p>
        </div>
      </RouterLink>
    </template>
  </USlideover>
</template>
