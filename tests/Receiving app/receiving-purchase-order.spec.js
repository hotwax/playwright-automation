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

  const receiveAllButtons = page.locator("ion-button", {
    hasText: "Receive All",
  });

  const count = await receiveAllButtons.count();

  // click all "Receive All" buttons
  for (let i = 0; i < count; i++) {
    const button = receiveAllButtons.nth(i);
    await button.scrollIntoViewIfNeeded();
    await button.click();
    await page.waitForTimeout(1000); // small gap so UI can update
  }
  await page.getByText("Receive", { exact: true }).click();
  await page.waitForTimeout(5000);
  await page.locator(".alert-button-inner", { hasText: "Proceed" }).click();
  await page.waitForTimeout(5000);
});
