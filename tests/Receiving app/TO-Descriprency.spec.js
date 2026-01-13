import { test, expect } from "@playwright/test";

test("Sanity | Receiving | Transfer order receive with discrepancy", async ({
  page,
}) => {
  // Step 1: Navigate directly to Transfer Orders page
  await page.goto("https://receiving-dev.hotwax.io/transfer-orders");

  // Assertion: Transfer Orders page loaded
  const transferOrdersTab = page.getByText("Transfer Orders");
  await expect(transferOrdersTab).toBeVisible();
  await transferOrdersTab.click();

  // Step 2: Open specific Transfer Order
  const transferOrder = page.getByText("TEST030625 M100105");
  await expect(transferOrder).toBeVisible();
  await transferOrder.click();

  // Step 3: Switch to All items
  const allTab = page.locator("ion-segment-button").filter({ hasText: "All" });
  await expect(allTab).toBeVisible();
  await allTab.click();

  // Step 4: Initial Receive and Complete
  const receiveAndCompleteBtn = page.getByRole("button", {
    name: "Receive and complete",
  });
  await expect(receiveAndCompleteBtn).toBeEnabled();
  await receiveAndCompleteBtn.click();

  // Step 5: Confirm discrepancy popup
  const okBtn = page.getByRole("button", { name: "Ok" });
  await expect(okBtn).toBeVisible();
  await okBtn.click();

  // Step 6: Enter discrepancy quantities
  const firstQtyInput = page.locator("ion-input").nth(2);
  await expect(firstQtyInput).toBeVisible();
  await firstQtyInput.fill("3");

  const secondQtyInput = page.locator("ion-input").nth(3);
  await expect(secondQtyInput).toBeVisible();
  await secondQtyInput.fill("9");

  // Step 7: Receive and Complete again
  await expect(receiveAndCompleteBtn).toBeEnabled();
  await receiveAndCompleteBtn.click();

  // Step 8: Select discrepancy reasons
  const firstReason = page
    .getByRole("listitem")
    .filter({ hasText: "191993925088Lissandra" })
    .locator("svg");

  await expect(firstReason).toBeVisible();
  await firstReason.click();

  const secondReason = page
    .getByRole("listitem")
    .filter({ hasText: "198353035487Helen Brights" })
    .locator("svg");

  await expect(secondReason).toBeVisible();
  await secondReason.click();

  // Step 9: Complete Transfer Order
  const completeTransferBtn = page.getByRole("button", {
    name: "Complete transfer order",
  });
  await expect(completeTransferBtn).toBeEnabled();
  await completeTransferBtn.click();
});
