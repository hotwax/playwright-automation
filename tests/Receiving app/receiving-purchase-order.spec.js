import { test, expect } from "@playwright/test";

test("Sanity | Receiving | Purchase Order receive flow (direct URL)", async ({
  page,
}) => {
  // Step 1: Navigate directly to Purchase Orders page
  await page.goto("https://receiving-dev.hotwax.io/purchase-orders");

  // Assertion: Ensure Purchase Orders page is loaded
  const pageHeading = page.getByRole("heading", { name: "Purchase Orders" });
  await expect(pageHeading).toBeVisible();

  // Step 2: Open specific Purchase Order
  const purchaseOrder = page.getByRole("heading", { name: "5739" });
  await expect(purchaseOrder).toBeVisible();
  await purchaseOrder.click();

  // Step 3: Enter received quantity
  const qtyInput = page.getByRole("spinbutton", { name: "Qty" });
  await expect(qtyInput).toBeVisible();
  await qtyInput.fill("4");

  // Step 4: Receive items
  const receiveBtn = page.getByRole("button", { name: "Receive", exact: true });
  await expect(receiveBtn).toBeEnabled();
  await receiveBtn.click();

  // Step 5: Proceed confirmation
  const proceedBtn = page.getByRole("button", { name: "Proceed" });
  await expect(proceedBtn).toBeVisible();
  await proceedBtn.click();
});
