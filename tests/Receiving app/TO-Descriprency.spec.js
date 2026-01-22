import { test, expect } from "@playwright/test";

test("Sanity | Receiving | Transfer order receive with discrepancy", async ({
  page,
}) => {
  // Step 1: Navigate directly to Transfer Orders page
  await page.goto("https://receiving-dev.hotwax.io/transfer-orders");
  await page.waitForTimeout(2000);

  await page.locator("#ion-input-0").fill("hotwax.user");
  await page.locator("#ion-input-1").fill("hotwax@786");
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForTimeout(2000);

  // Assertion: Ensure Transfer Orders page is loaded
  const transferOrders = page.getByRole("listitem", {
    name: "Transfer Orders",
  });

  // Step 2: Open specific Transfer Order
  const openTab = page.locator("ion-segment-button", { hasText: "Open" });

  await expect(openTab).toBeVisible();
  await openTab.click();
  await page.waitForTimeout(2000);
  // click on transfer order from the list.
  const firstOrder = page.locator("main ion-item").first();
  await expect(firstOrder).toBeVisible({ timeout: 15000 });
  await firstOrder.click({ force: true });
  await page.waitForTimeout(2000);

  await page.waitForURL(/transfer-order-detail\/.*/, { timeout: 20000 });

  // Click on Open Items tab.
  const openItemsTab = page.locator('ion-segment-button[content-id="open"]');

  await expect(openItemsTab).toBeVisible({ timeout: 15000 });
  await openItemsTab.click();
  await page.waitForTimeout(4000);

  // Step 3: Enter received quantity with discrepancy

  const qtyInput = page.locator('ion-input input[type="number"]').first();

  await expect(qtyInput).toBeVisible({ timeout: 15000 });
  await qtyInput.click();
  await qtyInput.fill("12000");
  await page.waitForTimeout(3000);

  // Step 4: Save progress

  const saveProgressBtn = page.getByRole("button", { name: /Save Progress/i });

  await expect(saveProgressBtn).toBeVisible({ timeout: 15000 });
  await saveProgressBtn.click();
  await page.waitForTimeout(3000);

  // Step 5: Handle discrepancy modal
  const firstDiscrepancyCheck = page.locator("svg.checkbox-icon").first();

  await expect(firstDiscrepancyCheck).toBeVisible({ timeout: 15000 });
  await firstDiscrepancyCheck.click();
  await page.waitForTimeout(2000);

  const saveProgressBtnInside = page.getByRole("button", {
    name: "Save progress",
  });

  // Step Y: Click Receive and complete
  const receiveAndCompleteBtn = page.locator("ion-button", {
    hasText: "Receive and complete",
  });
});
