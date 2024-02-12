import { Locator, Page } from "@playwright/test";

export class NavBar {
  readonly myAccount: Locator;

  constructor(public readonly page: Page) {
    this.page = page;
    this.myAccount = page.locator('[data-test="sidenav-user-settings"]');
  }

  async clickMyAccount() {
    await this.myAccount.click();
  }
}
