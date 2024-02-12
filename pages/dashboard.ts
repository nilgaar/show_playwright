import { Locator, Page, expect } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly dashboardTitle: Locator;
  readonly dashboardSubtitle: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardTitle = page.locator("css=h1");
    this.dashboardSubtitle = page.locator("css=h2");
    this.logoutButton = page.locator("css=button");
  }

  private auth() {}

  async goTo() {
    await this.page.goto("/");
  }

  async expectDashboardTitle() {
    expect(this.dashboardTitle).toHaveText("Dashboard");
  }

  async expectDashboardSubtitle() {
    expect(this.dashboardSubtitle).toHaveText("You are logged in!");
  }

  async expectLogoutButton() {
    expect(this.logoutButton).toBeVisible;
  }

  async clickLogoutButton() {
    await this.logoutButton.click();
  }
}
