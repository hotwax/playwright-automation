import { test, expect } from "@playwright/test";

test("Sanity | Receiving | Transfer order save progress flow", async ({
  page,
}) => {
  // Step 1: Navigate to Transfer Orders page
  await page.goto("https://receiving-dev.hotwax.io/transfer-orders");

  // Assertion: Transfer Orders section visible
  const transferOrdersTab = page.getByText("Transfer Orders");
  await expect(transferOrdersTab).toBeVisible();
  await transferOrdersTab.click();

  // Step 2: Switch to Open tab
  const openTab = page
    .locator("ion-segment-button")
    .filter({ hasText: "Open" });
  await expect(openTab).toBeVisible();
  await openTab.click();

  // Step 3: Open specific Transfer Order
  const transferOrder = page.getByText("fulfillment testing v2 M100876");
  await expect(transferOrder).toBeVisible();
  await transferOrder.click();

  // Step 4: Click Save Progress (0 units)
  const saveProgressBtn = page.getByRole("button", { name: /Save Progress/ });
  await expect(saveProgressBtn).toBeVisible();
  await saveProgressBtn.click();

  // Step 5: Confirm popup
  const okBtn = page.getByRole("button", { name: "Ok" });
  await expect(okBtn).toBeVisible();
  await okBtn.click();

  // Step 6: Enter partial received quantities
  const qtyInputs = page.locator("ion-input");

  await expect(qtyInputs.nth(0)).toBeVisible();
  await qtyInputs.nth(0).fill("1");

  await expect(qtyInputs.nth(1)).toBeVisible();
  await qtyInputs.nth(1).fill("1");

  // Step 7: Save Progress again (2 units)
  await expect(saveProgressBtn).toBeEnabled();
  await saveProgressBtn.click();

  // Step 8: Proceed confirmation
  const proceedBtn = page.getByRole("button", { name: "Proceed" });
  await expect(proceedBtn).toBeVisible();
  await proceedBtn.click();
});
