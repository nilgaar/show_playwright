import { Locator, Page, Response, expect } from '@playwright/test'

export class LoginPage {
    readonly usernameFormField: Locator
    readonly passwordFormField: Locator
    readonly rememberMeCheck: Locator
    readonly signInButton: Locator
    readonly loginAlert: Locator

    constructor(public readonly page: Page) {
        this.page = page
        this.usernameFormField = page.locator('css=#username')
        this.passwordFormField = page.locator('css=#password')
        this.signInButton = page.getByRole('button', { name: 'SIGN IN' })
        this.loginAlert = page.getByRole('alert')
    }

    async goTo() {
        await this.page.goto('/')
    }

    async fillLoginForm(username: string = '', password: string = '') {
        await this.usernameFormField.clear()
        await this.usernameFormField.fill(username)
        await this.passwordFormField.clear()
        await this.passwordFormField.fill(password)
    }

    async submitLoginForm() {
        await this.signInButton.click()
    }

    expectButtonDisabled() {
        expect(this.signInButton).toBeDisabled
    }

    expectUnauthorizedReponse() {
        this.page.on('response', (response) =>
            expect(response.status()).toBe(401)
        )
    }

    async expectOkResponse() {
        this.page.on('response', (response) => expect(response.ok))
    }

    expectInvalidCredentialsAlert() {
        expect(this.loginAlert).toBeVisible
    }

    expectNoLoginFormFieldsVisible() {
        expect(this.usernameFormField).not.toBeVisible
        expect(this.passwordFormField).not.toBeVisible
        expect(this.signInButton).not.toBeVisible
    }
}
