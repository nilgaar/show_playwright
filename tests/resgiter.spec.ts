import { test as base } from '@playwright/test'
import { SignUpPage } from '../pages/signUp'
import { User, UserGeneratorOptions } from '../data/user'

const test = base.extend<{ signupPage: SignUpPage }>({
    signupPage: async ({ page }, use) => {
        const signupPage = new SignUpPage(page)
        await signupPage.goTo()
        await use(signupPage)
    },
})

test.describe('SignUp Page', () => {
    test('Valid SignUp', async ({ signupPage }) => {
        const user = User.createRandomUser()
        await signupPage.fillForm(...user.toStringArray())
        signupPage.expectCreatedresponse()
        await signupPage.submitForm()
        await signupPage.expectRedirectToSignIn()
    })

    test('Password Min length', async ({ signupPage }) => {
        const user = User.createRandomUser([UserGeneratorOptions.shortPassword])
        await signupPage.fillForm(...user.toStringArray())
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
