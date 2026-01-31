import { test, expect } from "@playwright/test";
import { forceLogin, acceptCookies } from "./helpers.js";

test.describe("Administrators can manage universities", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Assume forceLogin is defined elsewhere
    await forceLogin(page);
    await acceptCookies(page);
  });

  test("Admin can view universities", async ({ page }) => {
    await page.goto("/universities");

    const table = page.locator("table");
    await expect(table).toBeVisible();
    const rows = await page.locator("table tr").count();
    expect(rows).toBeGreaterThan(0);
  });

  test("Admin can create university", () => {});

  test("Admin can update university", () => {});
});
