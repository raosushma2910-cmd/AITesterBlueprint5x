import { expect, test } from "@playwright/test";
import { LoginPage } from "../src/pages/login.page";

test("logs in with configured valid credentials", async ({ page }) => {
  const authTestingEnabled = process.env.RUN_AUTH_TESTS === "true";
  const email = process.env.VWO_USERNAME;
  const password = process.env.VWO_PASSWORD;
  const successIndicator = process.env.VWO_POST_LOGIN_INDICATOR;

  test.skip(
    !authTestingEnabled ||
      !email ||
      !password ||
      !successIndicator,
    "Set RUN_AUTH_TESTS=true and the VWO valid-login environment variables to enable this test."
  );

  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.submitCredentials(email!, password!);

  await expect(page.getByText(successIndicator!, { exact: false })).toBeVisible();
});
