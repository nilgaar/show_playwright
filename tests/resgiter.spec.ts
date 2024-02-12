import { test as base } from '@playwright/test'
import { SignUpPage } from '../pages/signUp'

const test = base.extend<{ signupPage: SignUpPage }>({
    signupPage: async ({ page }, use) => {
        const signupPage = new SignUpPage(page)
        await signupPage.goTo()
        await use(signupPage)
    },
})

test.describe('SignUp Page', () => {
    test('Valid SignUp', async ({ signupPage }) => {
        await signupPage.fillForm(
            'John',
            'Doe',
            'john_doe' + Date.now(),
            'password2',
            'password2'
        )
        signupPage.expectCreatedresponse()
        await signupPage.submitForm()
        await signupPage.expectRedirectToSignIn()
    })

    test('Password Min length', async ({ signupPage }) => {
        await signupPage.fillForm(
            'John',
            'Doe',
            'john_doe' + Date.now(),
            '123',
            '123'
        )
        await signupPage.expectPasswordMinLengthError()
    })

    test('Password Mismatch', async ({ signupPage }) => {
        await signupPage.fillForm(
            'John',
            'Doe',
            'john_doe' + Date.now(),
            'password2',
            'password3'
        )
        await signupPage.expectPasswordMismatchError()
    })
})
