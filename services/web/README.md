# NSOS - web client

## Setup

Make sure to install dependencies:

```bash
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run generate
```

Locally preview production build:

```bash
npm run preview
```

##

- john.smith@university.edu password123
- admin@university.edu admin123

## Happy paths to check:

1. Initial Setup & University Creation

- [ ] Register new account
- [ ] Create first university (should trigger multi-step modal/guide) \
       Step 1: Create university (name, description) \
       Step 2: Create at least one faculty \
       Step 3: Create at least one position \
- [ ] Step 4: Create first semester
- [ ] Verify all created entities appear in their respective lists

2. Core CRUD Operations

- University:
  - [ ] Create
  - [ ] View
  - [ ] Edit
  - [ ] Verify changes
- Faculty:
  - [x] Create
  - [x] View
  - [x] Edit
  - [x] Verify changes
- Position:
  - [x] Create
  - [x] View
  - [x] Edit
  - [x] Verify workload options work
- Semester:
  - [ ] Create
  - [ ] View
  - [ ] Edit
  - [ ] Verify faculty dropdown loads
- Course:
  - [x] Create
  - [x] View
  - [x] Edit
  - [x] Verify faculty & course type dropdowns work
- Course Group:
  - [ ] Create
  - [ ] View
  - [ ] Edit
  - [ ] Verify all dropdowns load (course, lecturer, semester)

3. Schedule & Class Management

- Schedule:
  - [ ] Create with recurrence rule
  - [ ] Add excluded date
  - [ ] Remove excluded date
  - [ ] Save
- Class:
  - [ ] Create from schedule
  - [ ] Change status (scheduled → completed)
  - [ ] Save
- Verify schedule appears in calendar/harmonogram view

4. Relationships & Data Integrity

- Create course
  - [ ] Create course group for that course
  - [ ] Verify course group shows course name
- Create semester:
  - [ ] Create course group in that semester
  - [ ] Verify semester dates apply
- Assign lecturer to course group
  - [ ] Verify lecturer appears in class form dropdown

5. Navigation & Cancel Actions

- [ ] Open any form Click cancel → Verify returns to previous page (no errors)
- [ ] Edit item → Click cancel → Verify no changes saved
- [ ] Create item → Submit → Verify redirects to detail/list page

6. Form Validation (Quick Check)

- [ ] Try submitting empty required field → See error message
- [ ] Try end_time before start_time → See validation error
- [ ] Try end_date before start_date → See validation error
- [ ] Try invalid academic_year format → See validation error

### 🔥 Phase 1: Critical MVP (The "Missing Links")

_Rationale: You have `Courses` and `Faculties` done. But without `Semesters` and `Course Groups`, you cannot schedule anything. These are blockers for your new Schedule features._

1. **Semester CRUD** `[Blocking Scheduling]`

- [ ] Create (Must enable date selection)
- [ ] View (Verify list loads)
- [ ] Verify Faculty dropdown loads (You need to attach a semester to a faculty)

2. **Course Group CRUD** `[The Glue]`

- _Note: This is the most important missing object. It links a Course + Lecturer + Semester._
- [x] Create (Ensure you can select a Course, a Lecturer, and a Semester)
- [x] View
- [ ] Verify all dropdowns load

3. **Schedule & Class Management** `[The New Feature]`

- _Note: Your `diff.txt` added the backend for this. Now you need the UI._
- [ ] Create Schedule (Start with simple weekly recurrence, don't overcomplicate UI yet)
- [ ] Verify schedule appears in **FullCalendar** view (Critical for visual confirmation)
- [ ] **Quick Fix**: Implement `handleEventClick` in `Calendar.vue` (just a simple alert or modal with details) to prove data is loaded.

### 🚧 Phase 2: High Priority (The "Admin Flow")

_Rationale: Once the academic structure works, you need to ensure the root "University" object—which you just refactored—can be managed._

4. **University (Root Entity)**

- [ ] Create (Basic form is enough; skip the "multi-step modal" for now if time is tight)
- [ ] View / List
- [ ] Verify "Initial Setup" flow (Register -> Create University)

5. **Data Integrity Checks**

- [ ] Assign Lecturer to Course Group -> Verify they appear in Class form
- [ ] Create Course Group in Semester -> Verify Semester dates limit the input

### ✨ Phase 3: Nice to Have (UX & Polish)

_Rationale: Do these only if Phase 1 & 2 are 100% stable. A demo can survive without a "Cancel" button, but it can't survive a crash._

6. **Navigation & Cancel Actions**

- [ ] Cancel buttons return to previous page
- [ ] Edit -> Cancel saves no changes

7. **Advanced Validation**

- [ ] Date logic (Start < End)
- [ ] Academic year format regex

8. **Advanced Scheduling**

- [ ] Excluded dates (Holidays)
- [ ] Complex Recurrence Rules (e.g., "Every 2 weeks")

---

### 📋 Updated README Snippet

_Copy-paste this into your README to track your sprint._

```markdown
## 🚀 Sprint Priorities

### 1. CRITICAL: Academic Structure (The "Missing Links")

- **Semester**:
  - [ ] Create (Must work to enable Course Groups)
  - [ ] View / List
  - [ ] Verify Faculty dropdown loads
- **Course Group** (Links Course + Lecturer + Semester):
  - [ ] Create
  - [ ] View
  - [ ] Verify Course, Lecturer, and Semester dropdowns work

### 2. CRITICAL: Scheduler (New Feature)

- **Schedule**:
  - [ ] Create (Basic weekly recurrence)
  - [ ] Save & Verify persistence
- **Calendar Visualization**:
  - [ ] Verify events appear in FullCalendar
  - [ ] Click event -> Show details (Basic modal)

### 3. CORE: Admin & University

- **University Management**:
  - [ ] Register new account
  - [ ] Create University (Basic Form)
  - [ ] View List
- **Relationships**:
  - [ ] Verify Course Group properly filters by Semester

### 4. POLISH: UX & Validation (If Time Permits)

- [ ] Form Validation (Start Date < End Date)
- [ ] Cancel buttons work correctly
- [ ] "Multi-step" guide for setup (Low priority, standard forms are fine)
- [ ] Excluded dates / Holidays in Schedule
```
