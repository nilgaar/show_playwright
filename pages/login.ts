import { Locator, Page, expect } from '@playwright/test'
import { Credentials } from '../data/user'

export class LoginPage {
    readonly usernameFormField: Locator
    readonly passwordFormField: Locator
    readonly rememberMeCheck: Locator
    readonly signInButton: Locator
    readonly loginAlert: Locator

    constructor(public readonly page: Page) {
        this.page = page
        this.usernameFormField = page.getByLabel('Username')
        this.passwordFormField = page.getByLabel('Password')
        this.signInButton = page.getByRole('button', { name: 'SIGN IN' })
        this.loginAlert = page.getByRole('alert')
    }

    async goTo() {
        await this.page.goto('/')
    }

    async fillLoginForm(credentials?: Credentials) {
        await this.usernameFormField.clear()
        await this.usernameFormField.fill(credentials?.username || '')
        await this.passwordFormField.clear()
        await this.passwordFormField.fill(credentials?.password || '')
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
