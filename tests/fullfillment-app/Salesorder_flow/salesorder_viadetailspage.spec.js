import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  // Open tab
  await page.getByText("Open").click();

  // Open order options (avoid nth if possible later)
  await page.locator('ion-chip [role="img"]').first().click();

  // View order details
  await page.getByRole("button", { name: "View details" }).click();

  // ASSERT: Order details page opened
  await expect(page.getByText("Order Details")).toBeVisible();

  // Pick order
  await page.getByRole("button", { name: "Pick order" }).click();

  // Select picker
  await page
    .getByRole("listitem", { name: /John Paul/i })
    .getByRole("img")
    .click();

  // Confirm pick
  await page.locator("ion-fab-button").getByRole("img").click();

  // Add box (do it once clearly)
  const addBoxButton = page.getByRole("button", { name: "Add Box" });
  await addBoxButton.click();

  // Pack order
  await page.getByRole("button", { name: "Pack order" }).click();

  // Select documents
  await page.getByRole("checkbox", { name: "Shipping labels" }).check();
  await page.getByRole("checkbox", { name: "Packing slip" }).check();

  // Handle popup safely
  const popupPromise = page.waitForEvent("popup");
  await page.getByRole("button", { name: "Pack" }).click();
  const popup = await popupPromise;
  await popup.close();

  // Ship order
  await page.getByRole("button", { name: "Ship order" }).click();

  // ASSERT: Order shipped successfully
  await expect(page.getByText(/Order shipped successfully/i)).toBeVisible();
});
