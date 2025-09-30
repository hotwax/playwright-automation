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
  // verify that back button is visible and we landed on the correct page.
  await expect(
    page.getByTestId("create-transfer-orders-back-btn"),
  ).toBeVisible();

  //verify that we are on the correct page.
  await expect(page.getByText("Create transfer order")).toBeVisible();

  // Search for product and add to transfer order.
  const searchInput = page.getByTestId("search-product-input");
  await expect(searchInput).toBeVisible();
  await searchInput.fill("MH01-XS-Orange");
  await searchInput.press("Enter"); // Simulate pressing Enter key to search.

  await expect(page.getByText("MH01-XS-Orange")).toBeVisible(); // Verify product appears in search results.

  const addToTransferBtn = page.getByTestId("Add-to-transfer-btn").first();
  // Select the first matching button.
  await expect(addToTransferBtn).toBeVisible();
  await addToTransferBtn.click();

  const itemQtyInput = page.getByTestId("qty-input").first();
  await expect(itemQtyInput).toBeVisible();
  await itemQtyInput.fill("101");
  await expect(itemQtyInput).toHaveValue("101");
  // verify that pack and ship button is visible
  await expect(page.getByTestId("pack-and-ship-order-btn")).toBeVisible();
  //verify that can click on the pack and ship button.
  await page.getByTestId("pack-and-ship-order-btn").click();
  // verify that we are on the correct page (ship Transfer order page).
  await expect(page.getByText("Ship Transfer Order")).toBeVisible();
  //verify that two tabs are visible(Purcahse Shipping Label And manual tracking)
  await getByText("Purchase shipping label").isVisible();
  await getByText("Manual tracking").isVisible();
  // verify that we can click on the purchase shipping label tab
  await page.getByText("Purchase Shipping label").click();
  //verify that purchase label button is visible and clickable.
  let purchaseLabelBtn = page.getByTestId("purchase-label-btn");
  await expect(purchaseLabelBtn).toBeVisible();
  await purchaseLabelBtn.click();
  //verify that user can see item card in next screen with delivery date and price
  await getByText("estimated delivery date").isVisible();
  await getByText("$").isVisible();
  // verify that tricking link is visible and clickable and redirect to the page.
  let trackingLink = page.getByTestId("tracking-code-link");
  await expect(trackingLink).toBeVisible();
  await trackingLink.click();
  await expect(page).toHaveURL(/.*tracking/);

  let shipAgainBtn = page.getByTestId("ship-order-btn-again");
  await expect(shipAgainBtn).toBeVisible();
  await shipAgainBtn.click();
});
