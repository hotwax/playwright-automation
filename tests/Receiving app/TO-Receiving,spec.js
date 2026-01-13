import { test, expect } from "@playwright/test";

test("Sanity | Receiving | Transfer order receive all and complete", async ({
  page,
}) => {
  // Step 1: Navigate to Transfer Orders page
  await page.goto("https://receiving-dev.hotwax.io/transfer-orders");

  // Assertion: Page loaded
  const transferOrdersTab = page.getByText("Transfer Orders");
  await expect(transferOrdersTab).toBeVisible();
  await transferOrdersTab.click();

  // Step 2: Open specific Transfer Order
  const transferOrder = page.getByText("TEST030625 M100106");
  await expect(transferOrder).toBeVisible();
  await transferOrder.click();

  // Step 3: Receive All for first item
  const receiveAllButtons = page.getByRole("button", { name: "Receive All" });
  await expect(receiveAllButtons.first()).toBeVisible();
  await receiveAllButtons.first().click();

  // Step 4: Receive All for second item
  await expect(receiveAllButtons.nth(1)).toBeVisible();
  await receiveAllButtons.nth(1).click();

  // Step 5: Receive and complete
  const receiveAndCompleteBtn = page.getByRole("button", {
    name: "Receive and complete",
  });
  await expect(receiveAndCompleteBtn).toBeEnabled();
  await receiveAndCompleteBtn.click();

  // Step 6: Proceed confirmation
  const proceedBtn = page.getByRole("button", { name: "Proceed" });
  await expect(proceedBtn).toBeVisible();
  await proceedBtn.click();

  // Step 7: Verify order moved to Completed tab
  const completedTab = page
    .locator("ion-segment-button")
    .filter({ hasText: /^Completed$/ });
  await expect(completedTab).toBeVisible();
  await completedTab.click();
});
