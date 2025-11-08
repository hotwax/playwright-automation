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
  await page
    .getByRole("textbox", { name: "Transfer name" })
    .fill("Ship Later Test 01");
  await page.waitForTimeout(3000);
  await page.getByRole("searchbox", { name: "search text" }).click();
  await page.getByRole("searchbox", { name: "search text" }).fill("central");
  await page.getByTestId("facility-radio-options").click();
  await page.getByTestId("save-transfer-order-btn").click();
  await page.waitForTimeout(5000);

  // const orderId = (
  //   await page.locator("ion-label p.overline").first().textContent()
  // )?.trim();
  // console.log("Order ID:", orderId);

  // await page.goto(
  //   ` https://fulfillment-dev.hotwax.io/transfer-order-details/${orderId}/open  `
  // );

  // //await page.goto(` https://fulfillment-dev.hotwax.io/transfer-order-details/${orderId}/open `);
  // await page.waitForTimeout(3000);
  // selecting serach tab
  await page.locator("ion-segment-button").nth(1).click();

  // Adding item to Transfer Order
  await page
    .getByTestId("search-product-input")
    .getByRole("searchbox", { name: "search text" })
    .fill("MH07");
  await page.getByRole("button", { name: "Add to Transfer" }).click();

  await page.waitForTimeout(5000);

  // Marking order to Shiplater
  await page.getByRole("button", { name: "Ship later" }).click();

  await page.waitForTimeout(3000);

  await page.getByTestId("shiplater-continue-btn").click();

  await page.waitForTimeout(5000);

  await page.getByText("Ship Later Test 01").click();

  await page.getByRole("ion-button", { name: "PICK ALL" }).click();

  await page.getByRole("ion-button", { name: " Create shipment" }).click();
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "Create" }).click();
});
