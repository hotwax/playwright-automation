import { test, expect } from "@playwright/test";

test("Sanity | Receiving | Purchase Order receive flow (direct URL)", async ({
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

  await page.getByText("Purchase Orders").click();
  await page.waitForTimeout(2000);
  // clcik on first purchase order from the list.
  const firstOrder = page.locator("ion-item:has(ion-label h3)").first();
  await firstOrder.click();
  await page.waitForTimeout(2000);
  // Click on Qty input field of first item and change value to 5
  // Step 6: Fill qty = 5 for all items
  const qtyInputs = page.locator('ion-item input.native-input[type="number"]');
  const count = await qtyInputs.count();

  for (let i = 0; i < count; i++) {
    const input = qtyInputs.nth(i);

    await input.scrollIntoViewIfNeeded();

    // Force focus on real input (prevents Receive All clicks)
    await input.evaluate((el) => el.focus());

    // Clear old value
    await input.press("Control+A");
    await input.press("Backspace");

    // Type new qty
    await input.type("5");

    // Let Ionic update
    await page.waitForTimeout(300);
  }
  // Step 8: Confirm Proceed
  await page.getByText("Proceed", { exact: true }).click();
});
