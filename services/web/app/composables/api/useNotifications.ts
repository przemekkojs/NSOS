import type { User } from "~/lib/api/schemas";
import { useStorage } from "@vueuse/core";
import { computed } from "vue";

export interface NSOSNotification {
  id: number;
  message: string;
  title: string;
  sender: User;
  read: boolean;
  timestamp: string;
  priority: "low" | "normal" | "high";
}

export const useNotifications = () => {
  const notifications = useStorage<NSOSNotification[]>("notifications", []);
  const unreadCount = computed<number>(() => {
    return notifications.value.filter((n) => !n.read).length;
  });

  const markAsRead = (id: number) => {
    const notification = notifications.value.find((n) => n.id === id);

    if (notification) {
      notification.read = true;
    }
  };

  const markAllAsRead = () => {
    notifications.value.forEach((n) => {
      n.read = true;
    });
  };

  const clearNotifications = () => {
    notifications.value = [];
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  };
};
