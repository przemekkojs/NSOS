# User Roles

NSOS is designed with two primary user roles, each with specific permissions and responsibilities. Understanding these roles helps ensure smooth system operation and proper workload management.

## Role Overview

| Role              | Access Level       | Primary Purpose                                    | Key Actions                  |
| ----------------- | ------------------ | -------------------------------------------------- | ---------------------------- |
| **Administrator** | Full system access | Manage teachers, assignments, and monitor overtime | Create, Read, Update, Delete |
| **Teacher**       | Personal data only | View schedule and workload                         | Read only                    |

## Administrator Role

### Access Level

**Full System Access** - Administrators have complete control over all system features and data.

### Primary Responsibilities

#### 1. Teacher Account Management

- Create new teacher accounts
- Update teacher information (position, pensum, contact details)
- Deactivate or archive teacher accounts
- Reset teacher passwords when needed

#### 2. Academic Structure Setup

- Define academic positions and their default pensum values
- Create and manage academic semesters
- Set active semester for current teaching period

#### 3. Subject and Group Management

- Create subjects with course codes and names
- Define teaching groups (sections) for each subject
- Assign teachers to groups
- Specify weekly hours and total semester hours
- Set schedules (day, time, room) for each group

#### 4. Workload Monitoring

- View real-time overtime dashboard for all teachers
- Identify teachers approaching or exceeding their pensum
- Redistribute assignments to balance workload
- Track unassigned teaching groups

#### 5. Reporting and Analysis

- Generate overtime reports for management review
- Export data for external analysis
- Review semester-wide workload distribution
- Prepare documentation for HR and payroll

### Key Features Available

::: details Overtime Dashboard (UC-04)
Real-time view of all teachers showing:

- Current assigned hours vs. pensum
- Overtime hours (positive or negative)
- Visual indicators (green/yellow/red status)
- Sortable and filterable list
- Quick links to modify assignments
  :::

::: details Teacher Management (UC-01, UC-06)
Complete teacher lifecycle management:

- Add new teachers with position and pensum
- Edit teacher information
- Modify teaching assignments
- View teacher's complete schedule
- Access historical assignment data
  :::

::: details Report Generation (UC-07)
Comprehensive reporting capabilities:

- Generate overtime reports by date range
- Export to PDF or CSV format
- Filter by department, position, or status
- Include summary statistics
- Customize report templates
  :::

::: details Semester Management (UC-08)
Control academic periods:

- Create new semesters
- Set semester dates and status
- Archive completed semesters
- Switch active semester
  :::

### Typical Administrator Workflow

**Start of Semester:**

1. Create new semester
2. Review and update teacher positions/pensum
3. Create subjects for the semester
4. Assign teaching groups to teachers
5. Review overtime dashboard for balance

**During Semester:**

1. Monitor overtime dashboard weekly
2. Adjust assignments as needed
3. Handle teacher schedule change requests
4. Add/remove teaching groups as enrollment changes

**End of Semester:**

1. Generate final overtime reports
2. Archive semester data
3. Prepare summary for management
4. Review workload patterns for planning

### Administrator Best Practices

::: tip Planning Ahead
Set up academic positions and semester structure before adding teaching assignments. This prevents errors and ensures consistent pensum calculations.
:::

::: tip Regular Monitoring
Check the overtime dashboard at least weekly during the semester. Early identification of overtime situations allows for proactive workload redistribution.
:::

::: tip Clear Communication
When modifying teacher assignments, communicate changes immediately. While teachers see updates in real-time, proactive communication prevents confusion.
:::

## Teacher Role

### Access Level

**Personal Data Only (Read-Only)** - Teachers can view their own schedule and workload information but cannot modify any data.

### Primary Responsibilities

#### 1. Review Personal Schedule

- Check assigned teaching groups
- Verify class times and locations
- Confirm total assigned hours

#### 2. Monitor Workload

- Track assigned hours against pensum
- Be aware of overtime status
- Plan workload accordingly

#### 3. Report Discrepancies

- Notify administrator of scheduling errors
- Request assignment changes if needed
- Confirm schedule updates

### Key Features Available

::: details Personal Hour Register (UC-05)
Comprehensive view of personal teaching assignments:

- List of all assigned subjects and groups
- Hours per week for each assignment
- Total semester hours
- Schedule details (day, time, room)
- Running total of assigned vs. pensum hours
- Overtime/remaining hours calculation
  :::

### Typical Teacher Workflow

**Start of Semester:**

1. Log in and review personal hour register
2. Verify all assigned groups are correct
3. Check total hours against expected workload
4. Note any discrepancies and contact administrator

**During Semester:**

1. Check schedule regularly for updates
2. Monitor total assigned hours
3. Be aware of overtime status
4. Plan teaching activities based on confirmed schedule

**End of Semester:**

1. Review final hour totals
2. Confirm overtime hours if applicable
3. Prepare for next semester planning discussions

### Teacher Best Practices

::: tip Regular Check-ins
Review your personal hour register at least once a week, especially early in the semester when schedules may still be adjusted.
:::

::: tip Understand Your Pensum
Know your contracted pensum hours and how your position's requirements are calculated. This helps you understand your workload expectations.
:::

::: tip Report Issues Promptly
If you notice scheduling conflicts, incorrect hour calculations, or missing assignments, contact your administrator immediately.
:::

## Permission Matrix

Detailed breakdown of what each role can do:

### Teacher Management

| Action                 | Administrator | Teacher |
| ---------------------- | ------------- | ------- |
| View all teachers      | ✅ Yes        | ❌ No   |
| View own profile       | ✅ Yes        | ✅ Yes  |
| Create teacher account | ✅ Yes        | ❌ No   |
| Edit teacher info      | ✅ Yes        | ❌ No   |
| Delete teacher         | ✅ Yes        | ❌ No   |

### Subject & Group Management

| Action                    | Administrator | Teacher |
| ------------------------- | ------------- | ------- |
| Create subjects           | ✅ Yes        | ❌ No   |
| Create groups             | ✅ Yes        | ❌ No   |
| Assign teachers to groups | ✅ Yes        | ❌ No   |
| View all groups           | ✅ Yes        | ❌ No   |
| View assigned groups      | ✅ Yes        | ✅ Yes  |
| Modify assignments        | ✅ Yes        | ❌ No   |

### Overtime & Reporting

| Action                      | Administrator | Teacher |
| --------------------------- | ------------- | ------- |
| View all teachers' overtime | ✅ Yes        | ❌ No   |
| View own overtime           | ✅ Yes        | ✅ Yes  |
| Generate reports            | ✅ Yes        | ❌ No   |
| Export data                 | ✅ Yes        | ❌ No   |
| Access overtime dashboard   | ✅ Yes        | ❌ No   |
| View personal hour register | ✅ Yes        | ✅ Yes  |

### System Configuration

| Action                    | Administrator | Teacher |
| ------------------------- | ------------- | ------- |
| Manage semesters          | ✅ Yes        | ❌ No   |
| Define positions          | ✅ Yes        | ❌ No   |
| Configure system settings | ✅ Yes        | ❌ No   |
| View system logs          | ✅ Yes        | ❌ No   |

## Role Assignment

### How Roles are Assigned

**Administrator Role:**

- Assigned during system installation
- Can be granted by existing administrators
- Typically limited to academic affairs staff
- Requires higher-level institutional approval

**Teacher Role:**

- Automatically assigned when account is created
- Default role for all teaching staff
- No special permissions required

### Changing Roles

::: warning Security Notice
Role changes should be handled carefully. Administrator access grants full control over sensitive workload and personnel data.
:::

Only existing administrators can:

1. Grant administrator access to teacher accounts
2. Revoke administrator access
3. Deactivate user accounts

## Future Role Enhancements

The following roles are being considered for future releases:

::: info Coming in Future Versions

- **Department Head**: View and manage only their department's teachers
- **Dean/Management**: Read-only access to reports and analytics
- **Student**: View course schedules and enrolled groups
- **HR Staff**: Access to workload data for compensation purposes
  :::

## Common Role-Related Questions

### Can a teacher become an administrator?

Yes, administrators can grant admin access to teacher accounts. The teacher will retain access to their personal schedule while gaining full administrative capabilities.

### Can administrators see a teacher's view?

Yes, administrators can view any teacher's personal hour register, which shows exactly what that teacher sees in their account.

### What if someone needs both roles?

If someone needs both teaching assignments and administrative capabilities, they should have one account with administrator access. They can view their own schedule through the personal hour register.

### How do I request additional permissions?

Contact your system administrator. Permission changes require administrative approval and depend on your institution's policies.

## Related Documentation

- [Getting Started Guide](/guide/getting-started) - Initial setup and login
- [Administrator Guide](/administrator/) - Complete admin feature documentation
- [Teacher Guide](/teacher/) - Complete teacher feature documentation
- [Use Cases Overview](/use-cases/overview) - Detailed scenarios for each role

---

::: tip Need Help?
If you're unsure about your role permissions or need access to additional features, contact your system administrator.
:::
