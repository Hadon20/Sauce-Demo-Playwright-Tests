import { Page } from "@playwright/test"
import { LoginPage } from "./LoginPage"
import { InventoryPage } from "./InventoryPage"

export class PageManager {

    private readonly loginPage: LoginPage
    private readonly inventoryPage: InventoryPage

    constructor(private readonly page: Page) {

        this.loginPage = new LoginPage(this.page)
        this.inventoryPage = new InventoryPage(this.page)

    }

    loginAction() {
        return this.loginPage
    }

    inventoryAction() {
        return this.inventoryPage
    }
}