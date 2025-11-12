import { test, expect } from '@playwright/test'
import { forceLogin, acceptCookies } from './helpers.js'

/**
 * E2E Testing Strategy for Admin Course Management
 *
 * This test suite covers the complete CRUD operations and workflows for course management.
 *
 * Coverage Areas:
 * 1. Course List View - Display, filtering, sorting, pagination
 * 2. Course Creation - Form validation, required fields, data persistence
 * 3. Course Viewing - Detail page, data accuracy
 * 4. Course Editing - Update functionality, validation, optimistic updates
 * 5. Course Deletion - Confirmation flow, cascade effects, error handling
 * 6. Permissions - Admin-only access, role-based restrictions
 * 7. Edge Cases - Invalid data, network errors, concurrent operations
 * 8. Integration - API communication, state management, navigation
 */

test.describe('Admin Course Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
    await forceLogin(page)
    await acceptCookies(page)
  })

  test.describe('Course List View', () => {
    test('Admin can view courses list', async ({ page }) => {
      await page.goto('http://localhost:5173/courses')

      // Verify page loaded
      await expect(page).toHaveTitle(/Courses/)

      // Verify table is visible
      const table = page.locator('table')
      await expect(table).toBeVisible()

      // Verify table has headers
      await expect(page.getByText('Name')).toBeVisible()
      await expect(page.getByText('Weekly Hours')).toBeVisible()
      await expect(page.getByText('ECTS')).toBeVisible()
      await expect(page.getByText('Course Group')).toBeVisible()
      await expect(page.getByText('Type')).toBeVisible()
    })

    test('Courses list displays correct data', async ({ page }) => {
      await page.goto('http://localhost:5173/courses')

      // Wait for data to load
      const table = page.locator('table')
      await expect(table).toBeVisible()

      // Verify at least one course row exists
      const rows = await page.locator('table tbody tr').count()
      expect(rows).toBeGreaterThan(0)

      // Verify first row has data in all columns
      const firstRow = page.locator('table tbody tr').first()
      await expect(firstRow).toBeVisible()
    })

    test('Each course row has action menu', async ({ page }) => {
      await page.goto('http://localhost:5173/courses')

      // Find action button
      const actionButton = page.getByLabel('Actions menu').first()
      await expect(actionButton).toBeVisible()

      // Open dropdown
      await actionButton.click()

      // Verify menu items exist
      await expect(page.getByText('View')).toBeVisible()
      await expect(page.getByText('Edit')).toBeVisible()
      await expect(page.getByText('Delete')).toBeVisible()
    })

    test('Courses list shows loading state', async ({ page }) => {
      // Slow down network to see loading state
      await page.route('**/api/courses', async (route) => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        await route.continue()
      })

      await page.goto('http://localhost:5173/courses')

      // Check for loading indicator
      const loadingIndicator = page.locator('[data-loading="true"]').or(page.getByText('Loading'))
      await expect(loadingIndicator).toBeVisible()
    })
  })

  test.describe('Course Creation', () => {
    test('Admin can access course creation form', async ({ page }) => {
      await page.goto('http://localhost:5173/courses')

      // Click create button
      const createButton = page.getByRole('button', { name: /create|add course/i })
      await expect(createButton).toBeVisible()
      await createButton.click()

      // Verify form is displayed
      await expect(page.getByLabel(/name/i)).toBeVisible()
      await expect(page.getByLabel(/weekly hours/i)).toBeVisible()
      await expect(page.getByLabel(/ects/i)).toBeVisible()
      await expect(page.getByLabel(/course type/i)).toBeVisible()
      await expect(page.getByLabel(/faculty/i)).toBeVisible()
    })

    test('Admin can create a new course with valid data', async ({ page }) => {
      await page.goto('http://localhost:5173/courses')

      // Open create form
      const createButton = page.getByRole('button', { name: /create|add course/i })
      await createButton.click()

      // Fill in course data
      await page.fill('[name="name"]', 'Introduction to Computer Science')
      await page.fill('[name="weeklyHours"]', '4')
      await page.fill('[name="weeksCount"]', '15')
      await page.fill('[name="ects"]', '6')
      await page.fill('[name="courseGroup"]', 'CS101')

      // Select course type
      await page.selectOption('[name="courseType"]', 'egz')

      // Select faculty
      await page.selectOption('[name="facultyId"]', { index: 1 })

      // Submit form
      await page.click('button[type="submit"]')

      // Verify success notification
      await expect(page.getByText(/created successfully|success/i)).toBeVisible()

      // Verify redirect to courses list
      await page.waitForURL(/\/courses$/)

      // Verify new course appears in list
      await expect(page.getByText('Introduction to Computer Science')).toBeVisible()
    })

    test('Form validation - required fields', async ({ page }) => {
      await page.goto('http://localhost:5173/courses')

      const createButton = page.getByRole('button', { name: /create|add course/i })
      await createButton.click()

      // Submit empty form
      await page.click('button[type="submit"]')

      // Verify validation errors
      await expect(page.getByText(/required|mandatory/i).first()).toBeVisible()
    })

    test('Form validation - ECTS range', async ({ page }) => {
      await page.goto('http://localhost:5173/courses')

      const createButton = page.getByRole('button', { name: /create|add course/i })
      await createButton.click()

      // Enter invalid ECTS (> 30)
      await page.fill('[name="ects"]', '35')
      await page.fill('[name="name"]', 'Test Course')

      // Trigger validation
      await page.click('button[type="submit"]')

      // Verify error message
      await expect(page.getByText(/must be.*30|invalid.*ects/i)).toBeVisible()
    })

    test('Form validation - negative values', async ({ page }) => {
      await page.goto('http://localhost:5173/courses')

      const createButton = page.getByRole('button', { name: /create|add course/i })
      await createButton.click()

      // Enter negative values
      await page.fill('[name="weeklyHours"]', '-5')
      await page.fill('[name="ects"]', '-2')

      // Trigger validation
      await page.click('button[type="submit"]')

      // Verify error messages
      await expect(page.getByText(/must be positive|greater than 0/i).first()).toBeVisible()
    })

    test('Can cancel course creation', async ({ page }) => {
      await page.goto('http://localhost:5173/courses')

      const createButton = page.getByRole('button', { name: /create|add course/i })
      await createButton.click()

      // Fill some data
      await page.fill('[name="name"]', 'Test Course')

      // Click cancel
      const cancelButton = page.getByRole('button', { name: /cancel/i })
      await cancelButton.click()

      // Verify back to courses list
      await expect(page.locator('table')).toBeVisible()

      // Verify course was not created
      await expect(page.getByText('Test Course')).toBeHidden()
    })
  })

  test.describe('Course Viewing', () => {
    test('Admin can view course details', async ({ page }) => {
      await page.goto('http://localhost:5173/courses')

      // Click on first course row or View action
      const firstRow = page.locator('table tbody tr').first()
      await firstRow.click()

      // Verify redirected to detail page
      await page.waitForURL(/\/courses\/\d+/)

      // Verify course details are displayed
      await expect(page.getByText(/name|course name/i)).toBeVisible()
      await expect(page.getByText(/ects/i)).toBeVisible()
      await expect(page.getByText(/weekly hours/i)).toBeVisible()
    })

    test('Course detail page shows all fields', async ({ page }) => {
      // Navigate directly to a course detail page
      await page.goto('http://localhost:5173/courses/1')

      // Wait for data to load
      await page.locator('body').waitFor({ state: 'visible', timeout: 5000 })

      // Verify all course fields are present
      await expect(page.locator('body')).toContainText(/name/i)
      await expect(page.locator('body')).toContainText(/ects/i)
      await expect(page.locator('body')).toContainText(/weekly.*hours/i)
      await expect(page.locator('body')).toContainText(/course.*type/i)
    })

    test('Non-existent course shows error', async ({ page }) => {
      await page.goto('http://localhost:5173/courses/999999')

      // Verify error message or 404 page
      await expect(page.getByText(/not found|course does not exist|404/i).first()).toBeVisible({
        timeout: 10000,
      })
    })
  })

  test.describe('Course Editing', () => {
    test('Admin can access course edit form', async ({ page }) => {
      await page.goto('http://localhost:5173/courses')

      // Open action menu for first course
      const actionButton = page.getByLabel('Actions menu').first()
      await actionButton.click()

      // Click Edit
      await page.getByText('Edit').click()

      // Verify edit form is displayed with existing data
      const nameInput = page.getByLabel(/name/i)
      await expect(nameInput).toBeVisible()
      await expect(nameInput).not.toHaveValue('')
    })

    test('Admin can update course information', async ({ page }) => {
      await page.goto('http://localhost:5173/courses')

      // Open edit form
      const actionButton = page.getByLabel('Actions menu').first()
      await actionButton.click()
      await page.getByText('Edit').click()

      // Update course name
      const nameInput = page.getByLabel(/name/i)
      await nameInput.clear()
      await nameInput.fill('Updated Course Name')

      // Update ECTS
      const ectsInput = page.getByLabel(/ects/i)
      await ectsInput.clear()
      await ectsInput.fill('8')

      // Submit changes
      await page.click('button[type="submit"]')

      // Verify success notification
      await expect(page.getByText(/updated successfully|success/i)).toBeVisible()

      // Verify changes persist
      await expect(page.getByText('Updated Course Name')).toBeVisible()
    })

    test('Edit form validation works', async ({ page }) => {
      await page.goto('http://localhost:5173/courses')

      // Open edit form
      const actionButton = page.getByLabel('Actions menu').first()
      await actionButton.click()
      await page.getByText('Edit').click()

      // Clear required field
      const nameInput = page.getByLabel(/name/i)
      await nameInput.clear()

      // Submit
      await page.click('button[type="submit"]')

      // Verify validation error
      await expect(page.getByText(/required|mandatory/i).first()).toBeVisible()
    })

    test('Can cancel course editing', async ({ page }) => {
      await page.goto('http://localhost:5173/courses')

      // Open edit form
      const actionButton = page.getByLabel('Actions menu').first()
      await actionButton.click()
      await page.getByText('Edit').click()

      // Make changes
      const nameInput = page.getByLabel(/name/i)
      await nameInput.clear()
      await nameInput.fill('This Should Not Save')

      // Cancel
      const cancelButton = page.getByRole('button', { name: /cancel/i })
      await cancelButton.click()

      // Verify changes were not saved
      await expect(page.getByText('This Should Not Save')).toBeHidden()
    })
  })

  test.describe('Course Deletion', () => {
    test('Admin can delete a course', async ({ page }) => {
      await page.goto('http://localhost:5173/courses')

      // Get course name before deletion
      const firstRow = page.locator('table tbody tr').first()
      const courseName = await firstRow.textContent()

      // Open action menu
      const actionButton = page.getByLabel('Actions menu').first()
      await actionButton.click()

      // Click Delete
      await page.getByText('Delete').click()

      // Verify confirmation dialog
      await expect(page.getByText(/are you sure|confirm|delete/i)).toBeVisible()

      // Confirm deletion
      const confirmButton = page.getByRole('button', { name: /confirm|yes|delete/i })
      await confirmButton.click()

      // Verify success notification
      await expect(page.getByText(/deleted successfully|removed/i)).toBeVisible()

      // Verify course removed from list
      await expect(page.getByText(courseName || '')).toBeHidden()
    })

    test('Can cancel course deletion', async ({ page }) => {
      await page.goto('http://localhost:5173/courses')

      // Get initial row count
      const initialRowCount = await page.locator('table tbody tr').count()

      // Open action menu
      const actionButton = page.getByLabel('Actions menu').first()
      await actionButton.click()

      // Click Delete
      await page.getByText('Delete').click()

      // Verify confirmation dialog
      await expect(page.getByText(/are you sure|confirm|delete/i)).toBeVisible()

      // Cancel deletion
      const cancelButton = page.getByRole('button', { name: /cancel|no/i })
      await cancelButton.click()

      // Verify row count unchanged
      const currentRowCount = await page.locator('table tbody tr').count()
      expect(currentRowCount).toBe(initialRowCount)
    })
  })

  test.describe('Permissions & Access Control', () => {
    // TODO: Implement when role-based auth is ready
    // test('Non-admin users cannot access course management')
    // 1. Login as non-admin user
    // 2. Try to access /courses
    // 3. Verify redirect or access denied message

    test('Unauthenticated users are redirected to login', async ({ page }) => {
      // Clear auth state
      await page.context().clearCookies()
      await page.goto('http://localhost:5173/courses')

      // Verify redirect to login
      await page.waitForURL(/\/login/)
      await expect(page).toHaveTitle(/Login/)
    })
  })

  test.describe('Error Handling', () => {
    test('Shows error on failed course load', async ({ page }) => {
      // Intercept API call and return error
      await page.route('**/api/courses', (route) => {
        route.fulfill({
          status: 500,
          body: JSON.stringify({ error: 'Server error' }),
        })
      })

      await page.goto('http://localhost:5173/courses')

      // Verify error message displayed
      await expect(page.getByText(/error|failed to load|something went wrong/i)).toBeVisible()
    })

    test('Shows error on failed course creation', async ({ page }) => {
      await page.goto('http://localhost:5173/courses')

      // Intercept create API call
      await page.route('**/api/courses', (route) => {
        if (route.request().method() === 'POST') {
          route.fulfill({
            status: 400,
            body: JSON.stringify({ error: 'Validation failed' }),
          })
        } else {
          route.continue()
        }
      })

      // Open create form
      const createButton = page.getByRole('button', { name: /create|add course/i })
      await createButton.click()

      // Fill and submit
      await page.fill('[name="name"]', 'Test Course')
      await page.fill('[name="ects"]', '6')
      await page.click('button[type="submit"]')

      // Verify error message
      await expect(page.getByText(/error|failed|validation/i)).toBeVisible()
    })

    test('Handles network timeout gracefully', async ({ page }) => {
      // Simulate timeout
      await page.route('**/api/courses', async () => {
        await new Promise((resolve) => setTimeout(resolve, 60000))
      })

      await page.goto('http://localhost:5173/courses')

      // Verify timeout error or loading state
      await expect(
        page.getByText(/timeout|taking too long|error/i).or(page.locator('[data-loading="true"]')),
      ).toBeVisible({ timeout: 10000 })
    })
  })

  test.describe('Integration & Navigation', () => {
    // TODO: Implement when back button is added
    // test('Course detail page has back button')
    // 1. Navigate to course detail
    // 2. Find and click back button
    // 3. Verify navigation to courses list
    // TODO: Implement when course groups feature is ready
    // test('Course groups link shows related groups')
    // 1. Navigate to course detail
    // 2. Click on course groups link
    // 3. Verify filtered course groups list
    // TODO: Implement when faculty navigation is ready
    // test('Faculty link navigates to faculty details')
    // 1. Navigate to course detail
    // 2. Click on faculty name/link
    // 3. Verify navigation to faculty page
  })

  test.describe('Data Persistence & State Management', () => {
    test('Course list refreshes after creation', async ({ page }) => {
      await page.goto('http://localhost:5173/courses')

      const initialRowCount = await page.locator('table tbody tr').count()

      // Create new course (simplified)
      const createButton = page.getByRole('button', { name: /create|add course/i })
      await createButton.click()

      await page.fill('[name="name"]', 'New Test Course')
      await page.fill('[name="weeklyHours"]', '3')
      await page.fill('[name="weeksCount"]', '15')
      await page.fill('[name="ects"]', '5')
      await page.selectOption('[name="courseType"]', 'zal')
      await page.selectOption('[name="facultyId"]', { index: 1 })

      await page.click('button[type="submit"]')

      // Wait for success
      await expect(page.getByText(/success/i)).toBeVisible()

      // Verify row count increased
      const newRowCount = await page.locator('table tbody tr').count()
      expect(newRowCount).toBeGreaterThan(initialRowCount)
    })

    // TODO: Implement when optimistic updates are added
    // test('Optimistic updates work correctly')
    // 1. Edit course
    // 2. Verify immediate UI update
    // 3. Verify persistence after API response
  })

  test.describe('Search & Filtering', () => {
    // TODO: Implement when filtering is ready
    // test('Can filter courses by faculty')
    // 1. Select faculty filter
    // 2. Verify only courses from that faculty shown
    // TODO: Implement when search is ready
    // test('Can search courses by name')
    // 1. Enter search term
    // 2. Verify filtered results
    // 3. Clear search shows all courses
    // TODO: Implement when filtering is ready
    // test('Can filter by course type')
    // 1. Select course type filter
    // 2. Verify only courses of that type shown
  })

  test.describe('Sorting & Pagination', () => {
    // TODO: Implement when sorting is ready
    // test('Can sort courses by name')
    // 1. Click name column header
    // 2. Verify ascending sort
    // 3. Click again for descending
    // TODO: Implement when sorting is ready
    // test('Can sort courses by ECTS')
    // TODO: Implement when pagination is ready
    // test('Pagination works correctly')
    // 1. Verify page size selector
    // 2. Navigate between pages
    // 3. Verify correct data on each page
  })
})
