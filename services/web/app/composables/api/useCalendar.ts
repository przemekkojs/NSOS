import { calendarApi } from "~/lib/api/modules/calendar";
import { useQuery } from "@tanstack/vue-query";
import type { CalendarOptions } from "@fullcalendar/core/index.js";
import type { CalendarParams } from "~/lib/api/modules/calendar";

export function useCalendar(params?: Ref<CalendarParams> | CalendarParams) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["calendar-events", params],
    queryFn: () => calendarApi.getEvents(unref(params)),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const events = computed(() => data.value || []);

  return {
    events,
    isLoading,
    error,
    refetch,
  };
}

export function useCalendarEventSource() {
  const userStore = useUserStore();

  // FullCalendar event source function
  const eventSource: CalendarOptions["events"] = async (
    fetchInfo,
    successCallback,
    failureCallback,
  ) => {
    try {
      const _user_id = unref(userStore.user.id);
      console.info(_user_id);

      const params = {
        start_date: fetchInfo.start.toISOString().split("T")[0],
        end_date: fetchInfo.end.toISOString().split("T")[0],
        user_id: _user_id,
      };

      const response = await calendarApi.getEvents(params);
      successCallback(response);
    } catch (err) {
      console.error("Error fetching calendar events:", err);
      failureCallback(err as Error);
    }
  };

  return {
    eventSource,
  };
}
