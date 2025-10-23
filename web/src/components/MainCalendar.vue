<script setup lang="ts">
import { computed } from 'vue'

import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import type { CalendarOptions } from '@fullcalendar/core/index.js'

const handleDateClick: CalendarOptions['dateClick'] = () => {}

const options = computed<CalendarOptions>(() => ({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridWeek',
  dateClick: handleDateClick,
}))
</script>
<template>
  <FullCalendar :options />
</template>
