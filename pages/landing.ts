import { Locator, Page } from "@playwright/test";
import { NavBar } from "../shared/navBar";

export class LandingPage {
  readonly page: Page;
  readonly navBar: NavBar;

  constructor(page: Page) {
    this.page = page;
    this.navBar = new NavBar(page);
  }
}
