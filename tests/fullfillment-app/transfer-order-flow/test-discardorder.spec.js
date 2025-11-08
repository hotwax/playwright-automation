import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.waitForTimeout(5000);
  await page.goto("https://fulfillment-dev.hotwax.io/open");
  await page.getByText("Transfer Orders").click();

  await page.waitForTimeout(5000);
  await page.getByTestId("create-transfer-order-btn").locator("path").nth(1).click();
  // await page.getByRole("textbox", { name: "Transfer name" }).click();
  await page
    .getByRole("textbox", { name: "Transfer name" })
    .fill("Discard Order Test 01");
  await page.waitForTimeout(3000);
  await page.getByRole("searchbox", { name: "search text" }).click();
  await page.getByRole("searchbox", { name: "search text" }).fill("central");
  await page.getByTestId("facility-radio-options").click();
  await page.getByTestId("save-transfer-order-btn").click();
  await page.waitForTimeout(3000);

  // After saving order next steps

  // selecting serach tab
  await page.locator("ion-segment-button").nth(1).click();

  // Adding item to Transfer Order
  await page
    .getByTestId("search-product-input")
    .getByRole("searchbox", { name: "search text" })
    .fill("MH09");
  await page.getByRole("button", { name: "Add to Transfer" }).click();
  await page.waitForTimeout(5000);

  // Discard order
  await page.getByRole("button", { name: "Discard order" }).click();
  await page.waitForTimeout(3000);
});
