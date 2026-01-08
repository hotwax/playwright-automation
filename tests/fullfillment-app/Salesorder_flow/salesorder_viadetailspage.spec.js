import { test, expect } from "@playwright/test";

test("Sanity | Fulfillment order flow - Pick, Pack and Ship", async ({ page }) => {
  // Navigate to Open orders page
  await page.goto("https://fulfillment-dev.hotwax.io/open");

  // Ensure Open tab is active
  await expect(page.getByRole("tab", { name: "Open" })).toBeVisible();

  // Open order action menu
  await page.locator('ion-chip [role="img"]').first().click();

  // View order details
  await page.getByRole("button", { name: "View details" }).click();

  // Assert Order Details page
  await expect(page.getByText("Order Details")).toBeVisible();

  // Pick order
  await page.getByRole("button", { name: "Pick order" }).click();

  // Assign picker
  await page
    .getByRole("listitem", { name: /John Paul/i })
    .getByRole("img")
    .click();

  // Confirm picking
  await page.locator("ion-fab-button").getByRole("img").click();

  // Add box
  await page.getByRole("button", { name: "Add Box" }).click();

  // Pack order
  await page.getByRole("button", { name: "Pack order" }).click();
});