import { Page, expect } from "@playwright/test"
import { LOGIN_SELECTORS } from "../Constants/selectors"

export class LoginPage {

    constructor(private readonly page: Page) { }

    async loginWithCredentials(username: string, password: string) {

        await this.page.getByPlaceholder(LOGIN_SELECTORS.USERNAME).fill(username)
        await this.page.getByPlaceholder(LOGIN_SELECTORS.PASSWORD).fill(password)
        await this.page.locator(LOGIN_SELECTORS.LOGIN_BUTTON).click()

    }

    async expectLoginError(expectedMessage: string) {
        await expect(this.page.locator(LOGIN_SELECTORS.ERROR_MESSAGE)).toContainText(expectedMessage)
    }

}