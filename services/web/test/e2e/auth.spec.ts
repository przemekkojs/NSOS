import { test, expect } from "@playwright/test";
import { forceLogin, acceptCookies, user } from "./helpers.js";

test.describe.configure({ mode: "parallel" });

test.describe("Auth flows", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("User can login", async ({ page }) => {
    await page.goto("/en/login");

    await page.getByLabel("Email").fill(user.email);
    await page.getByLabel("Password").fill(user.password);
    await page
      .getByRole("button", {
        name: "Log In",
      })
      .click();
    await acceptCookies(page);

    await expect(page.getByTestId("user-menu").first()).toBeVisible();
  });

  test("User can register", async ({ page }) => {
    await page.goto("/en/register");

    await expect(page).toHaveTitle(/Register/);

    await page.getByLabel("Email").fill(user.email);
    await page.getByLabel("Password").fill(user.password);
    await page.getByLabel("Confirm password").fill(user.password);
    await page.getByRole("button", { name: "Register" }).click();
    await acceptCookies(page);

    await expect(page.getByTestId("user-menu")).toBeVisible();
  });

  test("User can logout", async ({ page }) => {
    await forceLogin(page);
    await acceptCookies(page);

    const userPresence = page.getByTestId("sidebar-user-select").first();
    await expect(userPresence).toBeVisible();
    await userPresence.dispatchEvent("click");

    await page.getByTestId("user-menu-logout").click();
    await page.waitForURL("/login");
    await expect(page).toHaveTitle(/Login/);
    const loginButton = page.getByTestId("login-submit");
    await expect(loginButton).toBeVisible();
  });
});
