import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.waitForTimeout(5000);
  await page.goto("https://fulfillment-dev.hotwax.io/open");
  await page.getByText("Transfer Orders").click();

  await page.waitForTimeout(5000);
  await page
    .getByTestId("create-transfer-order-btn")
    .locator("path")
    .nth(1)
    .click();
  // await page.getByRole("textbox", { name: "Transfer name" }).click();
  await page.getByRole("textbox", { name: "Transfer name" }).fill("Order Test");
  await page.getByRole("searchbox", { name: "search text" }).click();
  await page.getByRole("searchbox", { name: "search text" }).fill("Central");
  await page.getByTestId("facility-radio-options").click();
  await page.getByTestId("save-transfer-order-btn").click();
  await page.waitForTimeout(5000);

  // After saving order next steps

  // selecting serach tab
  await page.locator("ion-segment-button").nth(1).click();
  // Adding 1 item
  await page
    .getByTestId("search-product-input")
    .getByRole("searchbox", { name: "search text" })
    .fill("MH09");
  await page.getByRole("button", { name: "Add to Transfer" }).click();
  await page.waitForTimeout(5000);
  // Adding 2nd item
  await page
    .getByTestId("search-product-input")
    .getByRole("searchbox", { name: "search text" })
    .click();
  await page
    .getByTestId("search-product-input")
    .getByRole("searchbox", { name: "search text" })
    .fill("MH03");

  await page.waitForTimeout(5000);
  await page.getByRole("button", { name: "Add to Transfer" }).click();
  await page.waitForTimeout(5000);
  // Adding 3rd item
  await page
    .getByTestId("search-product-input")
    .getByRole("searchbox", { name: "search text" })
    .click();
  await page
    .getByTestId("search-product-input")
    .getByRole("searchbox", { name: "search text" })
    .fill("MH06");
  await page.getByRole("button", { name: "Add to Transfer" }).click();
  await page.waitForTimeout(5000);
  // Testing input qty flow
  await page
    .getByTestId("product-card-btn-01")
    .getByRole("spinbutton", { name: "Qty" })
    .click();
  await page
    .getByTestId("product-card-btn-01")
    .getByRole("spinbutton", { name: "Qty" })
    .fill("12");
  await page.waitForTimeout(5000);
  // Testing Book by BQH flow
  await page
    .getByTestId("product-card-btn-02")
    .locator("div")
    .filter({ hasText: /^Book qoh$/ })
    .click();
  await page.waitForTimeout(5000);
  //Testing Remove button
  await page
    .getByTestId("product-card-btn-03")
    .getByTestId("remove-item-btn")
    .getByRole("img")
    .click();
  await page.waitForTimeout(5000);
  // search item and view more item button
  await page
    .getByTestId("search-product-input")
    .getByRole("searchbox", { name: "search text" })
    .fill("Red");
  // await page.getByTestId("view-more-results").locator("slot").nth(1).click();
  await page.getByTestId("view-more-results").locator("svg").click();
  await page
    .locator("ion-item")
    .filter({ hasText: "MH09-M-Red10011Add to Transfer" })
    .getByRole("button")
    .click();
  await page.waitForTimeout(5000);
  await page.getByRole("button", { name: "reset" }).click();
  await page.getByRole("searchbox", { name: "search text" }).click();
  await page.getByRole("searchbox", { name: "search text" }).fill("SKU");
  await page.getByRole("searchbox", { name: "search text" }).press("Enter");
  await page
    .locator("ion-item")
    .filter({ hasText: "SKU11112121Add to Transfer" })
    .getByRole("button")
    .click();
  await page.waitForTimeout(5000);
  await page.getByRole("button", { name: "reset" }).click();
  await page.getByTestId("viewmore-close-modal").getByRole("button").click();
  await page.waitForTimeout(5000);

  // Next Pack and Ship
  await page.getByRole("button", { name: "Pack and ship order" }).click();
  await page.getByText("Manual tracking").click();

  await page.getByText("Carrier_NA_").click();

  // await page.getByTestId('carrier-dropdown').click();
  await page.getByRole("radio", { name: "FEDEX TEST" }).click();

  await page.getByTestId("tracking-code-input").locator("label").click();
  await page.getByRole("textbox", { name: "Tracking code" }).fill("32563");
  await page.getByRole("button", { name: "Ship order" }).click();
  await page.waitForTimeout(5000);

  // item is pack and shiped and now displayed in complted tab
  await page.getByTestId("completed-transfer-orders-tab").click();
});
