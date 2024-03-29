import { Locator, Page, expect } from '@playwright/test'
import { urls } from '../tools/constants'

export class SignUpPage {
    readonly url = '/signup'
    readonly firstNameFormField: Locator
    readonly lastNameFormField: Locator
    readonly usernameFormField: Locator
    readonly passwordFormField: Locator
    readonly confirmPasswordFormField: Locator
    readonly signUpButton: Locator
    readonly passwordErrorMessage: Locator
    readonly confirmPasswordErrorMessage: Locator
    constructor(public readonly page: Page) {
        this.page = page
        this.firstNameFormField = page.locator('css=#firstName')
        this.lastNameFormField = page.locator('css=#lastName')
        this.usernameFormField = page.locator('css=#username')
        this.passwordFormField = page.locator('css=#password')
        this.confirmPasswordFormField = page.locator('css=#confirmPassword')
        this.signUpButton = page.getByRole('button', { name: 'SIGN UP' })
        this.passwordErrorMessage = page.locator('css=#password-helper-text')
        this.confirmPasswordErrorMessage = page.locator(
            'css=#confirmPassword-helper-text'
        )
    }

    async goTo() {
        await this.page.goto(this.url)
    }
    async fillForm(
        firstName: string = '',
        lastName: string = '',
        username: string = '',
        password: string = '',
        confirmPassword: string = ''
    ) {
        await this.firstNameFormField.fill(firstName)
        await this.lastNameFormField.fill(lastName)
        await this.usernameFormField.fill(username)
        await this.passwordFormField.fill(password)
        await this.confirmPasswordFormField.fill(confirmPassword || password)
    }

    async submitForm() {
        await this.signUpButton.click()
    }

    expectCreatedresponse() {
        this.page.on('response', (response) => {
            expect(response.ok)
        })
    }

    async expectRedirectToSignIn() {
        await this.page.waitForURL(urls.signin)
    }

    async expectPasswordMinLengthError() {
        await this.passwordErrorMessage.waitFor({ state: 'visible' })
        await expect(this.passwordErrorMessage).toBeVisible()
    }

    async expectPasswordMismatchError() {
        await this.confirmPasswordErrorMessage.waitFor({ state: 'visible' })
        await expect(this.confirmPasswordErrorMessage).toBeVisible()
    }
}
