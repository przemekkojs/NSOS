import { useStorage, useWebSocket } from '@vueuse/core'
import { computed, watch } from 'vue'

export interface NSOSNotification {
  id: number
  message: string
  title: string
  read: boolean
  timestamp: string
  priority: 'low' | 'normal' | 'high'
}

export const useNotifications = () => {
  const notifications = useStorage<Notification[]>('notifications', [])
  const unreadCount = computed<number>(() => {
    return notifications.value.filter((n) => !n.read).length
  })

  const { data } = useWebSocket('ws://localhost:8000/inbox', {
    autoReconnect: {
      delay: 3000,
      retries: 3,
      onFailed: () => {
        alert('WebSocket reconnection failed')
      },
    },
    heartbeat: {
      message: 'ping',
      interval: 30000,
    },
    onConnected: (ws) => {
      console.log('WebSocket connected:', ws)
    },
    onDisconnected: (ws) => {
      console.log('WebSocket disconnected:', ws)
    },
  })

  watch(data, (newData) => {
    if (!newData) return

    const parsed = JSON.parse(newData.toString())

    if (parsed.type !== 'notification') return

    notifications.value.unshift(parsed.data)
  })

  const markAsRead = (id: number) => {
    const notification = notifications.value.find((n) => n.id === id)

    if (notification) {
      notification.read = true
    }
  }

  const markAllAsRead = () => {
    notifications.value.forEach((n) => {
      n.read = true
    })
  }

  const clearNotifications = () => {
    notifications.value = []
  }
  return {
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  }
}
