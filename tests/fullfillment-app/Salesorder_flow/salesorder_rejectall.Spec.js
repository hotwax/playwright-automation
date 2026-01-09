import { test, expect } from "@playwright/test";

test("Sanity | Fulfillment bulk order flow - Rejectall", async ({ page }) => {
  // Step 1: Navigate to Open Orders page
  await page.goto("https://fulfillment-dev.hotwax.io/open");

  // Assertion: Ensure Open Orders page is loaded
  await expect(page.getByRole("heading", { name: /open/i })).toBeVisible();

  // Step 2: Click on 'Reject all' button
  const rejectAllBtn = page.getByRole("button", { name: "Reject all" });
  await expect(rejectAllBtn).toBeVisible();
  await rejectAllBtn.click();

  // Step 3: Confirm rejection
  const rejectConfirmBtn = page.getByRole("button", {
    name: "Reject",
    exact: true,
  });
  await expect(rejectConfirmBtn).toBeVisible();
  await rejectConfirmBtn.click();
});
