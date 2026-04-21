import { test, expect } from "@playwright/test";

test("Sanity | Receiving | Transfer order receive all and complete", async ({
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

  // Step 3: Click on Receive All button

  // Get all product cards and iterate through them
  const productCards = page.locator("ion-card");

  const cardCount = await productCards.count();
  console.log("Total items in order:", cardCount);

  for (let i = 0; i < cardCount; i++) {
    const card = productCards.nth(i);

    // Locate Receive All button inside this card
    const receiveAllBtn = card.locator("ion-button", {
      hasText: "Receive All",
    });

    // Locate Qty input inside this card
    const qtyInput = card.locator('input[type="number"]');

    if ((await receiveAllBtn.count()) > 0) {
      const isDisabled =
        (await receiveAllBtn.getAttribute("disabled")) !== null ||
        (await receiveAllBtn.getAttribute("aria-disabled")) === "true";

      if (!isDisabled) {
        console.log(`Item ${i + 1}: Clicking Receive All`);
        await receiveAllBtn.scrollIntoViewIfNeeded();
        await receiveAllBtn.click({ force: true });
        await page.waitForTimeout(3000);
        continue;
      }
    }

    // If Receive All is not present OR disabled → fill Qty = 2
    if ((await qtyInput.count()) > 0) {
      console.log(`Item ${i + 1}: Receive All disabled → filling Qty = 2`);
      await qtyInput.first().scrollIntoViewIfNeeded();
      await qtyInput.first().fill("2");
      await page.waitForTimeout(5000);
    }
  }

  const receiveAndCompleteBtn = page
    .locator("ion-footer")
    .locator("ion-button", { hasText: "Receive and complete" });

  await expect(receiveAndCompleteBtn).toBeVisible({ timeout: 15000 });
  await expect(receiveAndCompleteBtn).not.toHaveAttribute(
    "aria-disabled",
    "true",
    { timeout: 20000 },
  );

  await receiveAndCompleteBtn.scrollIntoViewIfNeeded();
  await receiveAndCompleteBtn.click({ force: true });
  await page.waitForTimeout(3000);
});
