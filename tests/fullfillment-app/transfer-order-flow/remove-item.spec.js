import { test, expect } from "@playwright/test";

test("Remove item from Transfer Order", async ({ page }) => {
  await page.goto(
    "https://fulfillment-dev.hotwax.io/transfer-orders/<ORDER_ID>",
  );
  //https://fulfillment-uat.hotwax.io/transfer-orders

  const searchInput = page.getByTestId("search-product-input");
  await expect(searchInput).toBeVisible();
  await searchInput.fill("MH04LGreenHC");
  await searchInput.press("Enter");

  await expect(page.getByText("MH04LGreenHC")).toBeVisible();

  const addToTransferBtn = page.getByTestId("Add-to-transfer-btn").first();
  await expect(addToTransferBtn).toBeVisible();
  await addToTransferBtn.click();

  const itemQtyInput = page.getByTestId("qty-input").nth(0);
  await expect(itemQtyInput).toBeVisible();
  await itemQtyInput.fill("4");
  await expect(itemQtyInput).toHaveValue("4");

  const removeBtn = page.getByTestId("remove-item-btn").nth(0);
  await expect(removeBtn).toBeVisible();
  await removeBtn.click();

  await expect(page.getByText("MH04LGreenHC")).not.toBeVisible();
});
