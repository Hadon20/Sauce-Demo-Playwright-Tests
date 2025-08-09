import { test, expect } from '@playwright/test'
import { PageManager } from '../Classes/PageManager'
import testData from '../testData.json'
import { INVENTORY_SELECTORS } from '../Constants/selectors'
import { ITEMS_ON_SALE, TYPES_OF_SORT } from '../Constants/Values'

test.beforeEach(async ({ page }) => {
    await page.goto('/')
    const pageManager = new PageManager(page)
    await pageManager.loginAction().loginWithCredentials(testData.loginInfo.validUsername, testData.loginInfo.validPassword)
})


test('Verify products list matches expected items', async ({ page }) => {
    const itemsOnSale = (await page.locator(INVENTORY_SELECTORS.PRODUCT_LIST).allTextContents()).sort()
    const itemsList = Object.values(ITEMS_ON_SALE).sort()
    expect(itemsOnSale).toEqual(itemsList)
})

type sortingTestCases = {
    typeOfSortingValue: string
    typeOfSortingLabel: string,
    firstItem: string
}

const sortingTestCases: sortingTestCases[] = [
    {
        typeOfSortingValue: TYPES_OF_SORT.A_TO_Z[0],
        typeOfSortingLabel: TYPES_OF_SORT.A_TO_Z[1],
        firstItem: ITEMS_ON_SALE.SAUCE_LABS_BACKPACK
    },
    {
        typeOfSortingValue: TYPES_OF_SORT.Z_TO_A[0],
        typeOfSortingLabel: TYPES_OF_SORT.Z_TO_A[1],
        firstItem: ITEMS_ON_SALE.TSHIRT_RED
    },
    {
        typeOfSortingValue: TYPES_OF_SORT.PRICE_LOW[0],
        typeOfSortingLabel: TYPES_OF_SORT.PRICE_LOW[1],
        firstItem: ITEMS_ON_SALE.SAUCE_LABS_ONESIE
    },
    {
        typeOfSortingValue: TYPES_OF_SORT.PRICE_HIGH[0],
        typeOfSortingLabel: TYPES_OF_SORT.PRICE_HIGH[1],
        firstItem: ITEMS_ON_SALE.SAUCE_LABS_FLEECE_JACKET
    }
]

test.describe.parallel('Verify all types of sorting', () => {
    for (const { typeOfSortingValue, typeOfSortingLabel, firstItem } of sortingTestCases) {
        test(`Sort test - ${typeOfSortingLabel}`, async ({ page }) => {
            const pageManager = new PageManager(page)
            await pageManager.inventoryAction().sortingItems(typeOfSortingValue)
            const firstInList = page.locator(INVENTORY_SELECTORS.PRODUCT_NAME).first()
            await expect(firstInList).toHaveText(firstItem)
        })
    }
})

test('Single item page', async ({ page }) => {
    const listPageProduct = page.locator(INVENTORY_SELECTORS.PRODUCT_NAME, { hasText: ITEMS_ON_SALE.SAUCE_LABS_BACKPACK })
    const backButton = page.locator(INVENTORY_SELECTORS.BACK_TO_PRODUCTS_ID)
    const addButton = page.locator(INVENTORY_SELECTORS.ADD_BUTTON_ID)
    const detailPageTitle = page.locator(INVENTORY_SELECTORS.DETAILS_PRODUCT_NAME, { hasText: ITEMS_ON_SALE.SAUCE_LABS_BACKPACK })

    await listPageProduct.click()

    await expect(page).toHaveURL(/\/inventory-item\.html/)

    await Promise.all([
        expect(backButton).toBeVisible(),
        expect(addButton).toBeVisible(),
        expect(detailPageTitle).toBeVisible(),
    ])
})
