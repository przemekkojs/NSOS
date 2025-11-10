import { test, expect } from '@playwright/test'

test.describe('Auth flows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })
  test('User can login', async ({ page }) => {
    await page.goto('http://localhost:5173/auth/login')
  })

  test('User can register as admin', async ({ page }) => {
    await page.goto('http://localhost:5173/auth/login')

    await expect(page).toHave
  })
})
