import { test, expect } from '@playwright/test'
import { PageManager } from '../Classes/PageManager'
import testData from '../testData.json'

test.beforeEach(async ({ page }) => {

    await page.goto('/')

})

test('Valid Login', async ({ page }) => {

    const pageManager = new PageManager(page)

    await pageManager.loginAction().loginWithCredentials(testData.validUser.username, testData.validUser.password)
    const productsTitle = page.locator('.title', { hasText: 'Products' })
    await expect(productsTitle).toHaveText('Products')

})

const invalidLoginCases = [

    {
        testName: 'Wrong Username',
        userName: testData.invalidUser.username,
        password: testData.validUser.password,
        errorMessage: 'Username and password do not match'
    },
    {
        testName: 'Wrong Password',
        userName: testData.validUser.username,
        password: testData.invalidUser.password,
        errorMessage: 'Username and password do not match'

    },
    {
        testName: 'Empty Username',
        userName: '',
        password: testData.validUser.password,
        errorMessage: 'Username is required'
    },
    {
        testName: 'Empty Password',
        userName: testData.validUser.username,
        password: '',
        errorMessage: 'Password is required'
    }
]

test.describe('Invalid Login Scenarios', () => {

    for (const { testName, userName, password, errorMessage } of invalidLoginCases) {

        test(`Invalid Login - ${testName}`, async ({ page }) => {

            const pageManager = new PageManager(page)

            await pageManager.loginAction().loginWithCredentials(userName, password)
            await pageManager.loginAction().expectLoginError(errorMessage)

        })

    }

})

test('Logout', async ({ page }) => {

    const pageManager = new PageManager(page)

    await pageManager.loginAction().loginWithCredentials(testData.validUser.username, testData.validUser.password)
    await page.getByRole('button', { name: 'Open Menu' }).click()
    await page.locator('#logout_sidebar_link').click()
    await expect(page.getByPlaceholder('Username')).toBeVisible()

})