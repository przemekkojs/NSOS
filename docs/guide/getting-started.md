# Getting Started

Welcome to NSOS! This guide will help you get started with the system, whether you're an administrator setting up the platform or a teacher accessing your schedule.

## First Time Login

### Administrators

When you first access NSOS, you'll need to log in with your administrator credentials provided during system installation.

1. Navigate to the NSOS login page
2. Enter your administrator email and password
3. Click "Sign In"

::: tip
If you're setting up NSOS for the first time, the default administrator account should be changed immediately for security purposes.
:::

### Teachers

Teachers will receive login credentials from their institution's administrator:

1. Check your email for the welcome message from NSOS
2. Click the activation link or navigate to the login page
3. Enter your provided credentials
4. You may be prompted to change your password on first login

## Initial Setup Workflow (Administrators)

For a new NSOS installation, follow these steps in order:

### 1. Configure Academic Positions

Before adding teachers, define the academic positions used in your institution.

**Path:** Settings → Academic Positions

Common positions include:

- Professor (typical pensum: 120-150 hours/semester)
- Associate Professor (typical pensum: 150-180 hours/semester)
- Assistant Professor (typical pensum: 180-210 hours/semester)
- Lecturer (typical pensum: 210-240 hours/semester)

::: info What is Pensum?
**Pensum** is the contracted number of teaching hours per semester that a teacher must fulfill based on their position and employment type.
:::

[Learn more about defining positions →](/administrator/teacher-management#academic-positions)

### 2. Set Up Academic Semester

Configure the current academic semester to start tracking hours.

**Path:** Settings → Semesters

You'll need to specify:

- Semester name (e.g., "Fall 2024", "Spring 2025")
- Start date
- End date
- Status (active/inactive)

::: warning
Only one semester can be active at a time. All new assignments and hour calculations will be tied to the active semester.
:::

[Complete semester setup guide →](/administrator/semester-setup)

### 3. Add Teachers

Create teacher accounts with their positions and pensum.

**Path:** Teachers → Add New Teacher

Required information:

- Full name
- Email address
- Academic position
- Employment type (full-time, part-time)
- Pensum hours

[Detailed teacher management guide →](/administrator/teacher-management)

### 4. Create Subjects and Groups

Set up the courses and teaching groups for the semester.

**Path:** Subjects → Create Subject

For each subject, you'll define:

- Subject name and code
- Teaching groups (sections)
- Hours per week for each group
- Assigned teacher
- Room and schedule

[Subject assignment walkthrough →](/administrator/subject-assignment)

### 5. Monitor Overtime

Once assignments are created, use the dashboard to track teacher workload.

**Path:** Dashboard → Overtime Monitor

The dashboard shows:

- Teachers approaching their pensum
- Teachers with overtime hours
- Unassigned teaching groups
- Semester-wide statistics

[Using the overtime dashboard →](/administrator/overtime-monitoring)

## Quick Start for Teachers

As a teacher, your main interface is the **Personal Hour Register**.

### Accessing Your Schedule

1. Log in to NSOS
2. Navigate to "My Schedule" from the main menu
3. View your assigned teaching groups and total hours

### Understanding Your Hour Register

Your personal hour register displays:

| Column          | Description                                    |
| --------------- | ---------------------------------------------- |
| **Subject**     | Course name and code                           |
| **Group**       | Class section identifier                       |
| **Hours/Week**  | Weekly teaching hours for this group           |
| **Total Hours** | Hours for entire semester (Hours/Week × weeks) |
| **Schedule**    | Day, time, and room assignment                 |

At the bottom, you'll see:

- **Total Assigned Hours**: Sum of all your teaching assignments
- **Pensum**: Your contracted hours
- **Overtime/Remaining**: Hours over or under your pensum

::: tip
Your hour register is read-only. If you notice any errors in your assignments, contact your administrator.
:::

[Complete teacher guide →](/teacher/)

## Common First-Time Questions

### How is overtime calculated?

```
Overtime = Total Assigned Hours - Pensum

Examples:
- Pensum: 180 hours, Assigned: 200 hours → Overtime: 20 hours
- Pensum: 180 hours, Assigned: 160 hours → Remaining: 20 hours
```

### What happens if I'm assigned overtime?

The system flags overtime situations for administrator review. Your institution's policies determine whether overtime requires approval or additional compensation.

### Can I see historical data?

In the MVP version, you can only view the current active semester. Historical trend analysis will be available in future releases.

### How often is the data updated?

Hour calculations update in real-time as administrators create or modify teaching assignments.

## Next Steps

### For Administrators

- [Teacher Management Guide →](/administrator/teacher-management)
- [Subject Assignment Guide →](/administrator/subject-assignment)
- [Generating Reports →](/administrator/reporting)

### For Teachers

- [Understanding Your Pensum →](/teacher/understanding-pensum)
- [Viewing Your Schedule →](/teacher/viewing-schedule)

## Need Help?

If you encounter any issues:

1. Check the relevant section of this documentation
2. Review the [Use Cases](/use-cases/overview) for detailed scenarios
3. Contact your system administrator
4. Report bugs on [GitHub Issues](https://github.com/przemekkojs/NSOS/issues)

::: info MVP Notice
NSOS is currently in MVP (Minimum Viable Product) phase. Some features mentioned in documentation may be marked as "coming soon" or not yet available.
:::
