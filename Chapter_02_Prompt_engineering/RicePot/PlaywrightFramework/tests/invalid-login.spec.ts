import { expect, test } from "@playwright/test";
import { LoginPage } from "../src/pages/login.page";

test("shows the configured error for invalid credentials", async ({ page }) => {
  const authTestingEnabled = process.env.RUN_AUTH_TESTS === "true";
  const email = process.env.VWO_INVALID_USERNAME;
  const password = process.env.VWO_INVALID_PASSWORD;
  const expectedError = process.env.VWO_INVALID_LOGIN_ERROR;

  test.skip(
    !authTestingEnabled ||
      !email ||
      !password ||
      !expectedError,
    "Set RUN_AUTH_TESTS=true and the VWO invalid-login environment variables to enable this test."
  );

  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.submitCredentials(email!, password!);

  await expect(page.getByText(expectedError!, { exact: false })).toBeVisible();
});
