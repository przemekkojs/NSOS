import { test, expect } from '@playwright/test'
import { forceLogin, acceptCookies } from './helpers.js'

test.describe('Administrators can manage institutions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
    // Assume forceLogin is defined elsewhere
    await forceLogin(page)
    await acceptCookies(page)
  })

  test('Admin can view institutions', async ({ page }) => {
    await page.goto('http://localhost:5173/institutions')


    const table = page.locator('table')
    await expect(table).toBeVisible()
    const rows = await page.locator('table tr').count();
    expect(rows).toBeGreaterThan(0)

  })

  test('Admin can create institution', () => { })

  test('Admin can update institution', () => { })
})
