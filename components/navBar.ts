import { Locator, Page } from '@playwright/test'

export class NavBar {
    readonly myAccount: Locator
    readonly toggleMenu: Locator

    constructor(public readonly page: Page) {
        this.page = page
        this.myAccount = page.locator('[data-test="sidenav-user-settings"]')
        this.toggleMenu = page.locator('[data-test="sidenav-toggle"]')
    }

    async clickMyAccount(isMobile = false) {
        if (isMobile) {
            await this.toggleMenu.tap()
        }
        await this.myAccount.click()
    }
}
