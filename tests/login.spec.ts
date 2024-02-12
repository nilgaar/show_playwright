import { test as base } from '@playwright/test'
import { LoginPage } from '../pages/login'
import { correctCredentials, wrongCredentials } from '../data/credentials'

const test = base.extend<{ loginPage: LoginPage }>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page)
        await loginPage.goTo()
        await use(loginPage)
    },
})

test.describe('Login Page', () => {
    test('Empty Form field', async ({ loginPage }) => {
        await loginPage.fillLoginForm()
        loginPage.expectButtonDisabled()
    })

    test('Try wrong user', async ({ loginPage }) => {
        await loginPage.fillLoginForm(wrongCredentials)
        loginPage.expectUnauthorizedReponse()
        await loginPage.submitLoginForm()
        loginPage.expectInvalidCredentialsAlert()
    })

    test('Try correct user', async ({ loginPage }) => {
        await loginPage.fillLoginForm(correctCredentials)
        loginPage.expectOkResponse()
        await loginPage.submitLoginForm()
        loginPage.expectNoLoginFormFieldsVisible()
    })
})
