import { test, expect } from '@playwright/test'
import { PageManager } from '../Classes/PageManager'
import testData from '../testData.json'
import { LOGIN_SELECTORS } from '../Constants/selectors'
import { LOGIN_ERROR_MESSAGES } from '../Constants/messages'

test.beforeEach(async ({ page }) => {
    await page.goto('/')
})

test('Valid Login', async ({ page }) => {
    const pageManager = new PageManager(page)
    await pageManager.loginAction().loginWithCredentials(testData.loginInfo.validUsername, testData.loginInfo.validPassword)
    const productsTitle = page.locator('.title', { hasText: 'Products' })
    await expect(productsTitle).toHaveText('Products')
})

type InvalidLoginCase = {
    testName: string
    userName: string
    password: string
    errorMessage: string
}

const invalidLoginCases: InvalidLoginCase[] = [
    {
        testName: 'Wrong Username',
        userName: testData.loginInfo.invalidUsername,
        password: testData.loginInfo.validPassword,
        errorMessage: LOGIN_ERROR_MESSAGES.INVALID_CREDENTIALS
    },
    {
        testName: 'Wrong Password',
        userName: testData.loginInfo.validUsername,
        password: testData.loginInfo.invalidPassword,
        errorMessage: LOGIN_ERROR_MESSAGES.INVALID_CREDENTIALS

    },
    {
        testName: 'Empty Username',
        userName: '',
        password: testData.loginInfo.validPassword,
        errorMessage: LOGIN_ERROR_MESSAGES.USERNAME_REQUIRED
    },
    {
        testName: 'Empty Password',
        userName: testData.loginInfo.validUsername,
        password: '',
        errorMessage: LOGIN_ERROR_MESSAGES.PASSWORD_REQUIRED
    },
    {
        testName: 'Locked Out User',
        userName: testData.loginInfo.lockedOutUsername,
        password: testData.loginInfo.validPassword,
        errorMessage: LOGIN_ERROR_MESSAGES.LOCKED_OUT
    },
    {
        testName: 'Whitespace Username',
        userName: testData.loginInfo.whitespaceUsername,
        password: testData.loginInfo.validPassword,
        errorMessage: LOGIN_ERROR_MESSAGES.INVALID_CREDENTIALS
    },
    {
        testName: 'Whitespace Password',
        userName: testData.loginInfo.validUsername,
        password: testData.loginInfo.whitespacePassword,
        errorMessage: LOGIN_ERROR_MESSAGES.INVALID_CREDENTIALS
    }
]

test.describe.parallel('Invalid Login Scenarios', () => {
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
    await pageManager.loginAction().loginWithCredentials(testData.loginInfo.validUsername, testData.loginInfo.validPassword)
    await page.getByRole('button', { name: 'Open Menu' }).click()
    await page.locator(LOGIN_SELECTORS.LOGOUT_BUTTON).click()
    await expect(page.getByPlaceholder(LOGIN_SELECTORS.USERNAME)).toBeVisible()
})

test.afterEach(async ({ page }) => {
    await page.close()
})