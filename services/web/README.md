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
