import { test } from '@playwright/test'
import { SignUpPage } from '../pages/signUp'

test.describe('SignUp Page', () => {
    test('Valid SignUp', async ({ page }) => {
        var registerPage = new SignUpPage(page)
        await registerPage.goTo()
        await registerPage.fillForm(
            'John',
            'Doe',
            'john_doe' + Date.now(),
            'password2',
            'password2'
        )
        registerPage.expectCreatedresponse()
        await registerPage.submitForm()
        await registerPage.expectRedirectToSignIn()
    })
})
