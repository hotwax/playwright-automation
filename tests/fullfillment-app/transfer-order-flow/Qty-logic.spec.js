import { test, expect } from "@playwright/test";

test("Verify custom qty vs Book QOH qty", async ({ page }) => {
  await page.goto(
    "https://fulfillment-dev.hotwax.io/transfer-orders/<ORDER_ID>",
  );

  const searchInput = page.getByTestId("search-product-input"); // Search for product and add to transfer order.
  await expect(searchInput).toBeVisible();
  await searchInput.fill("MH02XSBlackHC");
  await searchInput.press("Enter"); // Simulate pressing Enter key to search.

  await expect(page.getByText("MH02XSBlackHC")).toBeVisible();

  const addToTransferBtn = page.getByTestId("Add-to-transfer-btn").first();
  // Select the first matching button.

  await expect(addToTransferBtn).toBeVisible();
  await addToTransferBtn.click();

  const itemQtyInput = page.getByTestId("qty-input").nth(0); //
  await expect(itemQtyInput).toBeVisible();

  const customValue = "10";
  await itemQtyInput.fill(customValue);
  await expect(itemQtyInput).toHaveValue(customValue);

  const qohBtn = page.getByTestId("book-qoh-btn").nth(0);
  await qohBtn.click();

  const qohValue = await itemQtyInput.inputValue();
  expect(Number(qohValue)).toBeGreaterThan(0);
  expect(qohValue).not.toBe(customValue);
});
