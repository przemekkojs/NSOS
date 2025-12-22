import type { Page } from "@playwright/test";

export const user = {
  id: 1,
  email: "john.doe@mail.com",
  password: "ExamplePassword1",
};

export async function forceLogin(page: Page) {
  await page.route(
    "http://localhost:8000/api/users/users/1/",
    async (route) => {
      if (route.request().method() !== "GET") return;

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
    }
  );

  await page.goto("/en/login");

  await page.getByLabel("Email").fill(user.email);
  await page.getByLabel("Password").fill(user.password);

  await Promise.all([
    page.waitForResponse(
      (resp) =>
        resp.url().includes("/api") && resp.request().method() === "POST"
    ),
    await page.getByRole("button", { name: "Log In" }).click(),
  ]);

  await page.waitForURL("/");
}

export async function acceptCookies(page: Page) {
  const acceptButton = page.getByTestId("accept-cookies-button");
  await acceptButton.waitFor({ state: "visible", timeout: 2000 });
  await acceptButton.click();
  await acceptButton.waitFor({ state: "hidden", timeout: 2000 });
}
