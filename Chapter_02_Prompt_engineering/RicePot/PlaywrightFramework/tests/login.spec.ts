import { expect, test } from "@playwright/test";
import { LoginPage } from "../src/pages/login.page";

test("shows the observed Wingify login controls", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();

  await expect(page).toHaveTitle("Login - Wingify");
  await expect(loginPage.signInButton).toBeVisible();
  await expect(page.getByRole("button", { name: "Forgot Password?" })).toBeVisible();
  await expect(page.getByText("Remember me", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign in with Google" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign in using SSO" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign in with Passkey" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Start a FREE TRIAL" })).toBeVisible();
});

test("toggles password visibility", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();

  await expect(loginPage.passwordInput).toHaveAttribute("type", "password");
  await loginPage.passwordVisibilityButton.click();
  await expect(loginPage.passwordInput).toHaveAttribute("type", "text");
  await loginPage.passwordVisibilityButton.click();
  await expect(loginPage.passwordInput).toHaveAttribute("type", "password");
});
