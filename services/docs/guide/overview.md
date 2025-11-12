# System Overview

## What is NSOS?

NSOS (Nasz System Obsługi Studiów) is a comprehensive academic management system designed to help educational institutions monitor and optimize teacher workload while managing the entire academic structure.

## The Problem NSOS Solves

Educational institutions often struggle with:

- **Hidden overtime costs** - Teachers exceed their contracted hours without visibility
- **Unbalanced workload** - Some teachers are overloaded while others are underutilized
- **Manual scheduling** - Hours spent manually creating and adjusting teaching schedules
- **Late detection** - Overtime issues discovered at semester end when it's too late
- **Multi-campus complexity** - Managing multiple institutions with different rules and structures

## How NSOS Helps

### For Administrators

**Real-time visibility** into teacher workload across all programs and groups.

**Proactive alerts** when teachers approach or exceed their pensum.

**Optimization tools** to redistribute teaching assignments efficiently.

**Flexible configuration** for different position types, pensum rules, and academic structures.

### For Teachers

**Transparent workload tracking** - Always know where you stand against your contracted hours.

**Personal hour register** - Detailed breakdown of all teaching assignments.

**Schedule access** - View your complete teaching calendar (harmonogram).

### For Students

**Self-service enrollment** - Browse and enroll in available courses.

**Personalized schedule** - See your complete class schedule at a glance.

## Core Concepts

### Multi-Institution Architecture

NSOS supports multiple institutions within a single deployment. Each institution:

- Has its own administrators and staff
- Maintains separate academic calendars
- Defines its own positions and pensum rules
- Operates with complete data isolation

::: tip Scaling Example
A university system with 3 campuses can manage all locations in one NSOS instance, with each campus having independent control over its academic operations.
:::

### Academic Hierarchy

```
Institution
└── Semester (e.g., "Winter 2024/25")
    ├── Holidays (e.g., Christmas Break)
    └── Study Programs (e.g., "Computer Science BA")
        └── Subjects (e.g., "Database Systems")
            └── Groups (e.g., "CS-DB-L01 - Lab Monday 10:00")
                └── Teachers (assigned with hour calculations)
```

### Position & Pensum System

**Position** defines a teacher's role (e.g., Professor, Assistant, Lecturer) with associated pensum rules.

**Pensum** is the contracted teaching hours per semester. Example:

- Professor (full-time): 120 hours/semester
- Assistant (part-time 0.5): 90 hours/semester
- Lecturer (hourly): Variable based on contract

**Multiple Positions**: A teacher can hold multiple positions (e.g., 0.5 Assistant + 0.25 Researcher).

### Teaching Hours Calculation

When a teacher is assigned to a group:

```
Weekly Hours × Number of Weeks = Total Hours

Example:
2 hours/week × 15 weeks = 30 hours
```

The system automatically:

- Calculates total hours for the semester
- Excludes holidays from week count
- Sums all assignments per teacher
- Compares against pensum
- Shows overtime/remaining hours

### Harmonogram (Master Schedule)

The harmonogram is the complete teaching schedule showing:

- All classes for the semester
- Assigned teachers
- Time slots and locations
- Student group assignments

**Optimization** tools help administrators:

- Detect scheduling conflicts
- Balance workload across teachers
- Identify unassigned groups
- Minimize overtime costs

## User Roles & Permissions

### System Administrator

- Creates and manages institutions
- Invites institution administrators
- System-wide configuration

### Institution Administrator

- Full control within their institution
- Manages staff, positions, and semesters
- Creates study programs and assigns teachers
- Views overtime dashboard
- Generates reports

### Teacher

- View personal teaching schedule (harmonogram)
- Access personal hour register
- Monitor workload vs pensum
- Read-only access to assigned groups

### Student

- Browse available courses
- Enroll in courses (subject to capacity)
- View personal schedule
- Access course information

## Typical Workflows

### Setting Up a New Semester

1. Administrator creates semester with dates
2. Adds holidays (Christmas, Easter, etc.)
3. Defines or updates study programs
4. Creates subjects with hour allocations
5. Creates groups with schedules
6. Assigns teachers to groups
7. Monitors overtime dashboard
8. Optimizes assignments as needed

### Teacher Assignment Process

1. Create teaching group (time, location, capacity)
2. System calculates required hours
3. Search for available teachers
4. View each teacher's current load
5. Assign teacher to group
6. System updates workload calculations
7. Check for overtime alerts

### Student Enrollment

1. Student logs into system
2. Browses available courses for their program
3. Views course details and schedule
4. Enrolls in course (if capacity available)
5. System adds to student's personal schedule

## Getting Started

Choose your path:

::: info I'm setting up NSOS for my institution
→ [Administrator Getting Started Guide](/administrator/getting-started)
:::

::: info I'm a teacher accessing NSOS
→ [Teacher Guide](/teacher/)
:::

::: info I'm a student using NSOS
→ [Student Guide](/student/)
:::

## Need Help?

- **Use Cases** - See detailed scenarios in [Use Cases Overview](/use-cases/)
- **Technical Docs** - Architecture and system design
- **Support** - Contact your institution administrator
