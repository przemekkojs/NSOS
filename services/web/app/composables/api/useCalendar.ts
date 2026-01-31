import { calendarApi } from "~/lib/api/modules/calendar";
import { useQuery } from "@tanstack/vue-query";
import type { CalendarOptions, EventInput } from "@fullcalendar/core/index.js";
import type { CalendarEvent, CalendarParams } from "~/lib/api/modules/calendar";

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
      if (!userStore.user) return;

      const _user_id = unref(userStore.user.id);
      console.info(_user_id);

      const params: CalendarParams = {
        start_date: fetchInfo.start.toISOString().split("T")[0],
        end_date: fetchInfo.end.toISOString().split("T")[0],
        user_id: _user_id.toString(),
      };

      const response = await calendarApi.getEvents(params);

      // @ts-expect-error these types don't match so if really needed fix them
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
