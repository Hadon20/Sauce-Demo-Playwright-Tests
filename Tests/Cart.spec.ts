import { test, expect } from '@playwright/test'
import { PageManager } from '../Classes/PageManager'
import testData from '../testData.json'

test.beforeEach(async ({ page }) => {
    await page.goto('/')
    const pageManager = new PageManager(page)
    await pageManager.loginAction().loginWithCredentials(testData.loginInfo.validUsername, testData.loginInfo.validPassword)
})
