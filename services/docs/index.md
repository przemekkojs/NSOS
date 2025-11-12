---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
hero:
  name: "NSOS"
  text: "Nasz System Obsługi Studiów"
  tagline: Academic management system for monitoring and minimizing teacher overtime
  actions:
    - theme: brand
      text: Get Started
      link: /guide/overview
    - theme: alt
      text: Administrator Guide
      link: /administrator/
    - theme: alt
      text: Teacher Guide
      link: /teacher/
    - theme: alt
      text: View on GitHub
      link: https://github.com/przemekkojs/NSOS

features:
  - title: Real-Time Overtime Tracking
    details: Monitor teacher workload against contracted pensum in real-time. Identify overtime situations before they become problems and optimize resource allocation.
    icon: 📊

  - title: Teacher Management
    details: Comprehensive teacher account and position management. Define pensum based on academic positions and employment contracts with full visibility into workload distribution.
    icon: 👥

  - title: Smart Assignment System
    details: Create subjects, assign teaching groups, and manage schedules efficiently. Automatic calculation of teaching hours helps prevent unnecessary overtime.
    icon: 📚

  - title: Reporting & Analytics
    details: Generate detailed overtime reports for management decisions. Personal hour registers give teachers full transparency into their workload.
    icon: 📈

  - title: Role-Based Access
    details: Separate views for administrators and teachers. Admins get full system control while teachers access their personal data and schedules.
    icon: 🔐

  - title: MVP-First Approach
    details: Currently in active development with focus on core overtime tracking functionality. Clean, focused feature set without unnecessary complexity.
    icon: 🚀
---

## Who is NSOS for?

### System Administrators

Register your institution, invite staff members, and configure the academic structure. [Get Started →](/administrator/)

### Institution Administrators

Manage semesters, create study programs, assign teachers, and monitor workload. [Learn More →](/administrator/getting-started)

### Teachers

View your teaching schedule, monitor your workload against pensum, and access your hour register. [View Guide →](/teacher/)

### Students

Enroll in courses and access your personalized class schedule. [Student Guide →](/student/)

## Key Concepts

**Institution** - An educational organization (university, college, school) with its own staff, programs, and academic calendar.

**Pensum** - The contracted number of teaching hours per semester based on a teacher's position and employment contract.

**Overtime** - Teaching hours assigned beyond a teacher's pensum: `Overtime = Assigned Hours - Pensum`

**Harmonogram** - The master teaching schedule showing all classes, teachers, times, and locations for a semester.

**Study Program** - An organized curriculum (e.g., "Computer Science BA") containing subjects and groups.

## Quick Start Paths

::: info For First-Time Administrators

1. [Register and create your institution](/administrator/institution-setup)
2. [Set up your first semester](/administrator/semester-management)
3. [Define teacher positions](/administrator/teacher-positions)
4. [Create a study program](/administrator/study-programs)
5. [Start assigning teachers](/administrator/teacher-assignments)
   :::

::: info For Teachers

1. [Access your institution](/teacher/getting-started)
2. [View your teaching schedule](/teacher/harmonogram)
3. [Check your hour register](/teacher/hour-register)
4. [Understand your workload](/teacher/understanding-pensum)
   :::
