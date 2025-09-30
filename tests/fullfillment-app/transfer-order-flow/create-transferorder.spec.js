import { test, expect } from "@playwright/test";

test("should open the create transfer order modal", async ({ page }) => {
  // Go to Transfer Orders page directly inside the test
  await page.goto(
    process.env.LOGIN_URL ||
      "https://fulfillment-dev.hotwax.io/transfer-orders",
  );

  // finding a create Trabsfer order button to open moda, Locate + button and click
  let createButton = page.getByTestId("create-transfer-order-btn");
  await expect(createButton).toBeVisible();
  await createButton.click();

  // Verify modal heading is create Tranfer order.
  let modalHeading = page.getByText("Create transfer order");
  await expect(modalHeading).toBeVisible();

  // Verify by enter transfer name
  let transferNameInput = page.getByTestId("transfer-name-input");
  await transferNameInput.fill("Playwright TO 001");

  //verify search is working or not
  let serachInput = page.getByTestId("facility-search-input");
  await serachInput.fill("Central Warehouse");
  await searchInput.press("Enter"); //hitting Enter key

  // verify by selecting first facility option
  let firstOption = page.getByTestId("facility-radio-options").first();
  await firstOption.click();

  // Verify that modal closed after sucessfull creation of order (heading no longer visible)
  await expect(page.getByText("Create transfer order")).not.toBeVisible();
  // verify that back button is visible
  await expect(
    page.getByTestId("create-transfer-orders-back-btn"),
  ).toBeVisible();

  //verify that ship later button is disabled when no items are added.
  let shiplaterbutton = page.getByTestId("ship-later-btn-disabled");
  await expect(shiplaterbutton).toBeVisible();
  await expect(shiplaterbutton).toBeDisabled();
  // verify that pack and ship button is disabled when no items are added.
  let packandshipbutton = page.getByTestId("pack-and-ship-btn-disabled");
  await expect(packandshipbutton).toBeVisible();
  await expect(packandshipbutton).toBeDisabled();
});
