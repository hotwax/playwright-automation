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
  await page
    .getByRole("searchbox", { name: "search text" })
    .fill("Central warehouse");
  await page.getByTestId("facility-radio-options").click();
  await page.getByTestId("save-transfer-order-btn").click();
  await page.waitForTimeout(3000);

  // After saving order next steps- edit deatils
  await page
    .getByTestId("order-name-edit-btn")
    .getByRole("button", { name: "Edit" })
    .click();
  await page.getByTestId("edited-order-name-input").click();
  await page.getByTestId("edited-order-name-input").fill("ty-02");
  await page.getByTestId("save-edited-transfer-order-name-btn").click();
  await page.getByTestId("store-name-edit-btn").locator("button").click();
  await page.getByRole("radio", { name: "Miami2 MIAMI2" }).click();
  await page
    .getByTestId("update-store-name-transfer-order-btn")
    .locator("path")
    .nth(1)
    .click();
});
