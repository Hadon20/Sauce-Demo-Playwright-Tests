import { Page } from "@playwright/test"
import { LoginPage } from "./LoginPage"

export class PageManager {

    private readonly loginPage: LoginPage

    constructor(private readonly page: Page) {

        this.loginPage = new LoginPage(this.page)

    }

    loginAction() {
        return this.loginPage
    }
}