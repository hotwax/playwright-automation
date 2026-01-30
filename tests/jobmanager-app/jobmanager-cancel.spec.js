import { test, expect } from "@playwright/test";

test("Sanity | Fulfillment order flow - Pick, Pack and Ship", async ({
  page,
}) => {
  // Step 1: Navigate to Job Manager pipeline page
  await page.goto("https://job-manager-dev.hotwax.io/pipeline");
  await page.waitForTimeout(2000);

  await page.locator("#ion-input-0").fill("hotwax.user");
  await page.locator("#ion-input-1").fill("hotwax@786");
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForTimeout(1000);

  // Assertion: Ensure pipeline page is loaded.
  await expect(
    page.locator("ion-title", { hasText: "Job Manager" }),
  ).toBeVisible();

  // Ensure the pipeline tab is visible and clicked
  await page.locator("ion-item", { hasText: "Pipeline" }).click();

  await page.waitForTimeout(2000);

  // refresh the page to load jobs latest data
  await page.reload();
  await page.waitForTimeout(2000);
  // Click on the first job in the pipeline
  await page.locator("ion-button", { hasText: "Cancel" }).first().click();

  await page.waitForTimeout(2000);
  // Wait for confirmation popup
  await page.getByRole("button", { name: /^CANCEL$/i }).click();
  await page.waitForTimeout(2000);
  await page.locator("ion-segment-button", { hasText: "History" }).click();
  await page.waitForTimeout(2000);
  // Verify that the job is moved to History tab and cancelled status is visible.
  await expect(
    page.locator(".job-card, ion-card").first().locator("text=Cancelled"),
  ).toBeVisible();
  await page.waitForTimeout(2000);
});
