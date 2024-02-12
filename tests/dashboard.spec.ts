import { expect, test } from '@playwright/test'
import { LoginPage } from '../pages/login'
import { correctCredentials } from '../data/credentials'
import { DashboardPage } from '../pages/dashboard'
import { MyAccount } from '../pages/myAccount'

test.describe('Dashboard Page', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.goTo()
        await loginPage.fillLoginForm(correctCredentials)
        await loginPage.submitLoginForm()
    })

    test('Check Account info', async ({ page, browserName }) => {
        const dashboardPage = new DashboardPage(page)
        await dashboardPage.navBar.clickMyAccount(
            browserName.includes('Mobile')
        )
        const myAccount = new MyAccount(page)
        expect(await myAccount.getFirstName()).toBe('Edgar')
    })
})
