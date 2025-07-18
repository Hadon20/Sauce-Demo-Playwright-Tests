import { Page, expect } from "@playwright/test"

export class LoginPage {

    constructor(private readonly page: Page) { }

    async loginWithCredentials(username: string, password: string) {

        await this.page.getByPlaceholder('Username').fill(username)
        await this.page.getByPlaceholder('Password').fill(password)
        await this.page.locator('#login-button').click()

    }

    async expectLoginError(expectedMessage: string) {
        await expect(this.page.locator('h3')).toContainText(expectedMessage)
    }

}