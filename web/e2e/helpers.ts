import { expect, Page } from '@playwright/test'

export const user = {
  id: 1,
  email: 'john.doe@mail.com',
  password: 'ExamplePassword1',
}

export async function forceLogin(page: Page) {
  await page.goto('http://localhost:5173/login')

  await expect(page).toHaveTitle(/Login/)

  await page.fill('#email', user.email)
  await page.fill('#password', user.password)

  await page.click('button[type="submit"]')
  await page.waitForURL('http://localhost:5173/')
}

export async function acceptCookies(page: Page) {
  const acceptButton = page.getByTestId('accept-cookies-button')
  await acceptButton.waitFor({ state: 'visible', timeout: 2000 })
  await acceptButton.click()
  await acceptButton.waitFor({ state: 'hidden', timeout: 2000 })
}
