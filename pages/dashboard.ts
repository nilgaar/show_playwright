import { Locator, Page, expect } from '@playwright/test'
import { NavBar } from '../components/navBar'

export class DashboardPage {
    readonly navBar: NavBar

    constructor(public readonly page: Page) {
        this.page = page
        this.navBar = new NavBar(page)
    }
}
