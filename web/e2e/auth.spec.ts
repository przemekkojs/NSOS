import { test, expect, Page } from '@playwright/test'

const user = {
  id: 1,
  email: 'john.doe@mail.com',
  password: 'ExamplePassword1',
}

//
async function forceLogin(page: Page) {
  await page.goto('http://localhost:5173/login')

  // const locator = page.getByTestId('login-form').first()
  await expect(page).toHaveTitle(/Login/)

  await page.fill('#email', user.email)
  await page.fill('#password', user.password)

  await page.click('button[type="submit"]')
  await page.waitForURL('http://localhost:5173/')
}

async function acceptCookies(page: Page) {
  const acceptButton = page.getByTestId('accept-cookies-button')
  await acceptButton.waitFor({ state: 'visible', timeout: 2000 })
  await acceptButton.click()
  await acceptButton.waitFor({ state: 'hidden', timeout: 2000 })
}

test.use({
  viewport: { width: 1280, height: 720 },
})

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

    await page.bringToFront()
    await page.mouse.move(0, 0) // Trigger any hover states

    const userPresence = page.getByTestId('sidebar-user-select').first()
    await expect(userPresence).toBeVisible()
    await userPresence.evaluate((el) => el.click())

    await page.getByTestId('user-menu-logout').click()
    await page.waitForURL('http://localhost:5173/login')
    await expect(page).toHaveTitle(/Login/)
    const loginButton = page.getByTestId('login-submit')
    await expect(loginButton).toBeVisible()
  })
})
