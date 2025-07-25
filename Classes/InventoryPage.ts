import { Page } from "@playwright/test"
import { INVENTORY_SELECTORS } from "../Constants/selectors"

export class InventoryPage {

    constructor(private readonly page: Page) { }

    async sortingItems(typeOfSorting: string) {
        await this.page.locator(INVENTORY_SELECTORS.SORT_CONTAINER).click()
        await this.page.selectOption(INVENTORY_SELECTORS.SORT_CONTAINER, typeOfSorting)
    }
}