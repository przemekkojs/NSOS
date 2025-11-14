<script setup lang="ts">
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { CalendarOptions } from "@fullcalendar/core/index.js";

const handleDateClick: CalendarOptions["dateClick"] = (arg) => {
  console.info("dateClick", arg);
};

const options = ref<CalendarOptions>({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: "dayGridWeek",
  dateClick: handleDateClick,
  eventClick: () => {
    console.info("click");
  },
  select: (arg) => {
    console.info("select", arg);
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
