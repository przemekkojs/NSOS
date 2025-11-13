import { expect, type Page } from "@playwright/test";

export const user = {
  id: 1,
  email: "john.doe@mail.com",
  password: "ExamplePassword1",
};

export async function forceLogin(page: Page) {
  await page.route("http://localhost:8000/auth/login", async (route) => {
    if (route.request().method() !== "POST") return;

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        user: {
          id: user.id,
          email: user.email,
        },
      }),
    });
  });

  await page.goto("/login");
  await expect(page).toHaveTitle(/Login/);

  await page.fill("#email", user.email);
  await page.fill("#password", user.password);

  const [response] = await Promise.all([
    page.waitForResponse(
      (resp) =>
        resp.url().includes("/auth/login") && resp.request().method() === "POST"
    ),
    page.click('button[type="submit"]'),
  ]);

  console.log("Response status:", response.status());

  // await page.click('button[type="submit"]');
  await page.waitForURL("/");
}

export async function acceptCookies(page: Page) {
  const acceptButton = page.getByTestId("accept-cookies-button");
  await acceptButton.waitFor({ state: "visible", timeout: 2000 });
  await acceptButton.click();
  await acceptButton.waitFor({ state: "hidden", timeout: 2000 });
}
