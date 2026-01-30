import { test, expect } from "@playwright/test";

test("Sanity | Fulfillment- sales order bulk order flow - Rejectall", async ({
  page,
}) => {
  // Step 1: Navigate to Open Orders page
  await page.goto("https://fulfillment-dev.hotwax.io/open");
  await page.waitForTimeout(2000);

  await page.locator("#ion-input-0").fill("hotwax.user");
  await page.locator("#ion-input-1").fill("hotwax@786");
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForTimeout(1000);

  // Assertion: Ensure Open Orders page is loaded
  await expect(page.locator("text=Open")).toBeVisible();

  // Step 2: Click on 'Reject all' button
  const rejectAllBtn = page.getByRole("button", { name: "Reject all" });
  await expect(rejectAllBtn).toBeVisible();
  await rejectAllBtn.click();

  await page.waitForTimeout(3000);

  // Step 3: Confirm rejection
  const rejectConfirmBtn = page.getByRole("button", {
    name: "Reject",
    exact: true,
  });
  await page.waitForTimeout(3000);
  await expect(rejectConfirmBtn).toBeVisible();
  await rejectConfirmBtn.click();
});
