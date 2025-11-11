import { test, expect } from '@playwright/test'
import { forceLogin, acceptCookies, user } from './helpers.js'

test.describe('Auth flows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('User can login', async ({ page }) => {
    await forceLogin(page)

    // this also has one hidden sidebar on mobile
    const userPresence = page.getByTestId('sidebar-user-select').first()
    await expect(userPresence).toBeVisible()
  })

  test('User can register', async ({ page }) => {
    await page.goto('http://localhost:5173/register')

    await expect(page).toHaveTitle(/Register/)

    await page.fill('#email', user.email)
    await page.fill('#password', user.password)
    await page.fill('#confirm-password', user.password)

    await page.click('button[type="submit"]')
    await page.waitForURL('http://localhost:5173/')
    await acceptCookies(page)

    //TODO: email verification flow

    const userPresence = page.getByTestId('sidebar-user-select').first()
    await expect(userPresence).toBeVisible()
  })

  test('User can logout', async ({ page }) => {
    await forceLogin(page)
    await acceptCookies(page)

    const userPresence = page.getByTestId('sidebar-user-select').first()
    await expect(userPresence).toBeVisible()
    // @ts-expect-error this exists
    await userPresence.evaluate((el) => el.click())

    await page.getByTestId('user-menu-logout').click()
    await page.waitForURL('http://localhost:5173/login')
    await expect(page).toHaveTitle(/Login/)
    const loginButton = page.getByTestId('login-submit')
    await expect(loginButton).toBeVisible()
  })
})
