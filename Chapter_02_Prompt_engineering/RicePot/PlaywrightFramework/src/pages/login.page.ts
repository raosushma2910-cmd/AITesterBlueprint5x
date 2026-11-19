import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly passwordVisibilityButton: Locator;
  readonly signInButton: Locator;

  constructor(private readonly page: Page) {
    this.emailInput = page.getByRole("textbox", { name: "Email address" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.passwordVisibilityButton = page.getByRole("button", {
      name: "Toggle password visibility"
    });
    this.signInButton = page.getByRole("button", { name: "Sign in", exact: true });
  }

  async open(): Promise<void> {
    await this.page.goto("/#/login");
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
  }

  async submitCredentials(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}
