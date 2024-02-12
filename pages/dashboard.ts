import { Locator, Page, expect } from '@playwright/test'
import { NavBar } from '../components/navBar'

export class DashboardPage {
    readonly dashboardTitle: Locator
    readonly dashboardSubtitle: Locator
    readonly logoutButton: Locator
    readonly navBar: NavBar

    constructor(public readonly page: Page) {
        this.page = page
        this.dashboardTitle = page.locator('css=h1')
        this.dashboardSubtitle = page.locator('css=h2')
        this.logoutButton = page.locator('css=button')
        this.navBar = new NavBar(page)
    }

    async goTo() {
        await this.page.goto('localhost')
    }

    async expectDashboardTitle() {
        expect(this.dashboardTitle).toHaveText('Dashboard')
    }

    async expectDashboardSubtitle() {
        expect(this.dashboardSubtitle).toHaveText('You are logged in!')
    }

    async expectLogoutButton() {
        expect(this.logoutButton).toBeVisible
    }

    async clickLogoutButton() {
        await this.logoutButton.click()
    }
}
