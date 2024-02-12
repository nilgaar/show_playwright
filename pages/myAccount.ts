import { Locator, Page } from '@playwright/test'
import { NavBar } from '../components/navBar'

export class MyAccount {
    readonly navBar: NavBar
    readonly firstName: Locator
    readonly lastName: Locator
    readonly email: Locator
    constructor(public readonly page: Page) {
        this.page = page
        this.navBar = new NavBar(page)
        this.firstName = page.locator('css=#user-settings-firstName-input')
        this.lastName = page.locator('css=#user-settings-lastName-input')
        this.email = page.locator('css=#user-settings-email-input')
    }

    async getFirstName() {
        return await this.firstName.inputValue()
    }
}
