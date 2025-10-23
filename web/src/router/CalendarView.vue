<script setup lang="ts">
import MainCalendar from '@/components/MainCalendar.vue'
</script>
<template>
  <UDashboardPanel id="calendar">
    <template #header>
      <UDashboardNavbar title="Calendar" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>
    <template #body>
      <MainCalendar />
    </template>
  </UDashboardPanel>
</template>
