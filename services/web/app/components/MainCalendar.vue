<script setup lang="ts">
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import type {
  CalendarOptions,
  EventClickArg,
} from "@fullcalendar/core/index.js";

const { eventSource } = useCalendarEventSource();

const handleDateClick: CalendarOptions["dateClick"] = (arg) => {
  console.info("dateClick", arg);
};

const handleEventClick = (clickInfo: EventClickArg) => {
  const { event } = clickInfo;
  const props = event.extendedProps;

  // Show event details
  console.log("Event clicked:", {
    title: event.title,
    start: event.start,
    end: event.end,
    courseCode: props.courseCode,
    courseName: props.courseName,
    room: props.room,
    lecturer: props.lecturerName,
    group: props.groupName,
  });

  // TODO: Open event details modal
};

const handleSelect: CalendarOptions["select"] = (selectInfo) => {
  console.log("Date range selected:", {
    start: selectInfo.start,
    end: selectInfo.end,
  });

  // TODO: Implement create event functionality if needed
};

const options = ref<CalendarOptions>({
  plugins: [timeGridPlugin, dayGridPlugin, interactionPlugin],
  initialView: "timeGridWeek",
  headerToolbar: {
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay",
  },
  dateClick: handleDateClick,
  eventClick: handleEventClick,
  select: handleSelect,
  selectable: true,
  selectMirror: true,
  nowIndicator: true,
  editable: false,
  events: eventSource,
  eventTimeFormat: {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  },
  slotMinTime: "08:00:00",
  slotMaxTime: "20:00:00",
  allDaySlot: false,
  // height: "auto",
  // viewClassNames: "h-full",
  // eventDisplay: "block",
  eventContent: (arg) => {
    const props = arg.event.extendedProps;

    return {
      html: `
        <div class="p-1 text-xs">
          <div class="font-semibold">${arg.event.title}</div>
          <div class="text-xs opacity-90">${props.room || ""}</div>
          ${props.lecturerName ? `<div class="text-xs opacity-75">${props.lecturerName}</div>` : ""}
        </div>
      `,
    };
  },
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
