import { test, expect } from "@playwright/test";

test("Add item to Transfer Order and update qty", async ({ page }) => {
  await page.goto(
    "https://fulfillment-dev.hotwax.io/transfer-orders/<ORDER_ID>",
  );

  //verify that we are on the correct page.
  await expect(page.getByText("Create transfer order")).toBeVisible();

  // Search for product and add to transfer order.
  const searchInput = page.getByTestId("search-product-input");
  await expect(searchInput).toBeVisible();
  await searchInput.fill("MH01-XS-Orange");
  await searchInput.press("Enter"); // pressing Enter key to search.

  await expect(page.getByText("MH01-XS-Orange")).toBeVisible(); // Verify product appears in search results.

  const addToTransferBtn = page.getByTestId("Add-to-transfer-btn").first();
  // Select the first matching button.
  await expect(addToTransferBtn).toBeVisible();
  await addToTransferBtn.click();

  const itemQtyInput = page.getByTestId("qty-input").first();
  await expect(itemQtyInput).toBeVisible();
  await itemQtyInput.fill("101");
  await expect(itemQtyInput).toHaveValue("101");
});
