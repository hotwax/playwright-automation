import { test, expect } from "@playwright/test";

test("Sanity | Fulfillment bulk order flow - Print Picklist, Pack and Ship", async ({ page }) => {
  // Navigate to Open orders page
  await page.goto("https://fulfillment-dev.hotwax.io/open");

  // Ensure Open tab is active
  await expect(page.getByRole("tab", { name: "Open" }))
    .toHaveAttribute("aria-selected", "true");

  // Print picklist
  await page.getByRole("button", { name: "Print Picklist" }).click();

  // Select picker for bulk operation
  await page
    .getByRole("listitem", { name: /HOTWAX_USER/i })
    .getByRole("checkbox")
    .check();

  // Confirm picker assignment
  await page.getByRole("button", { name: /confirm|assign/i }).click();

  // Bulk pack orders
  await page.getByRole("button", { name: "Pack orders" }).click();

  // Select packing documents
  await page.getByRole("checkbox", { name: "Shipping labels" }).check();
  await page.getByRole("checkbox", { name: "Packing slip" }).check();

  // Confirm pack (handle popup safely)
  const popupPromise = page.waitForEvent("popup");
  await page.getByRole("button", { name: "Pack" }).click();
  const popup = await popupPromise;
  await popup.close();

  // Verify orders moved to Completed tab
  await page.getByRole("tab", { name: "Completed" }).click();
  await expect(page.getByText(/Completed/i)).toBeVisible();

  // Ship order
  await page.getByRole("button", { name: "Ship", exact: true }).click();

  // Final assertion
  await expect(page.getByText(/order shipped/i)).toBeVisible();
});
