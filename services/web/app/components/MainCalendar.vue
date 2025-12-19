<script setup lang="ts">
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { CalendarOptions } from "@fullcalendar/core/index.js";

const handleDateClick: CalendarOptions["dateClick"] = (arg) => {
  console.info("dateClick", arg);
};

const options = ref<CalendarOptions>({
  plugins: [timeGridPlugin, dayGridPlugin, interactionPlugin],
  initialView: "timeGridWeek",
  dateClick: handleDateClick,
  nowIndicator: true,
  eventClick: () => {
    // TODO: implement the event click behavior
    if (import.meta.dev) {
      console.warn("Implement event click behavior");
    }
  },
  select: () => {
    // TODO: implement select behavior
    if (import.meta.dev) {
      console.warn("Implement select behavior");
    }
  },
  events: [
    { title: "event 1", date: new Date().toISOString().split("T")[0] },
    {
      title: "event 2",
      date: new Date().toISOString().split("T")[0],
      start: new Date().toISOString(),
      end: new Date(Date.now() + 3600 * 1000).toISOString(),
    },
  ],
  viewClassNames: "h-full",
});

const fullcalendar = useTemplateRef("fullcalendar");
const { width, height } = useElementSize(fullcalendar);

watch([width, height], () => {
  fullcalendar.value?.getApi().updateSize();
});
</script>
<template>
  <FullCalendar ref="fullcalendar" :options />
</template>
