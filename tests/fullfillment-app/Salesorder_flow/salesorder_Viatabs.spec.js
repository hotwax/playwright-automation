import { test, expect } from "@playwright/test";

test("Sanity | Fulfillment bulk order flow - Print Picklist, Pack and Ship via tabs ", async ({
  page,
}) => {
  // Navigate to Open orders page.
  await page.goto("https://fulfillment-dev.hotwax.io/open");

  await page.waitForTimeout(2000);

  await page.locator("#ion-input-0").fill("hotwax.user");
  await page.locator("#ion-input-1").fill("hotwax@786");
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForTimeout(2000);

  // Assertion: Ensure Open Orders page is loaded
  // Ensure Open tab is visible (Ionic-safe).
  const openTab = page.locator("text=Open").first();
  await expect(openTab).toBeVisible();

  // Print picklist
  await page.getByRole("button", { name: "Print Picklist" }).click();
  await page.waitForTimeout(3000);

  const modal = page.locator("ion-modal:visible");

  const checkboxes = page.locator("ion-list ion-item ion-checkbox");

  const count = await checkboxes.count();
  expect(count).toBeGreaterThan(1);

  await checkboxes.nth(0).click();
  await checkboxes.nth(1).click();

  await page.waitForTimeout(2000);
  // Click Save (blue FAB button inside modal)
  // Click Save button (blue FAB)
  const saveBtn = modal.locator("ion-fab-button");

  await expect(saveBtn).toBeVisible();
  await page.waitForTimeout(2000);

  // Handle new tab for PDF.
  const [pdfPage] = await Promise.all([
    page.context().waitForEvent("page"), //  waits for new tab
    saveBtn.click(), //  triggers PDF tab
  ]);
  await page.waitForTimeout(2000);
  // Wait for PDF to load
  await pdfPage.waitForLoadState();

  // Close the PDF tab
  await pdfPage.close();

  // Wait for modal to close.
  await expect(modal).toBeHidden();

  await page.waitForTimeout(2000);

  // Navigate to In Progress tab
  const inProgressTab = page.locator("ion-item", { hasText: "In Progress" });

  await expect(inProgressTab).toBeVisible();
  await inProgressTab.click();
  await page.waitForTimeout(2000);

  // Bulk pack orders
  const packOrdersBtn = page.getByRole("button", { name: "Pack orders" });

  await expect(packOrdersBtn).toBeVisible();
  await packOrdersBtn.click();
  await page.waitForTimeout(2000);

  // Select packing documents
  const packAlert = page
    .locator("ion-alert, .alert-wrapper")
    .filter({ hasText: "Pack orders" });

  // Select Shipping labels
  await packAlert.getByRole("checkbox", { name: "Shipping labels" }).click();

  // Select Packing slip
  await packAlert.getByRole("checkbox", { name: "Packing slip" }).click();
  await page.waitForTimeout(2000);

  // Confirm pack (handle popup safely)
  const popupPromise = page.waitForEvent("popup");

  // const popup = await popupPromise;
  // await popup.close();
  await page.waitForTimeout(5000);

  // Handle new tab for PDF
  const [pdfPage2] = await Promise.all([
    page.context().waitForEvent("page"), // waits for new tab
    await page.getByRole("button", { name: "Pack" }).click(),
  ]);
  await page.waitForTimeout(2000);
  // Wait for PDF to load
  await pdfPage2.waitForLoadState();

  // Close the PDF tab
  await pdfPage2.close();

  // Wait for modal to close
  await expect(modal).toBeHidden();

  await page.waitForTimeout(2000);

  // Verify orders moved to Completed tab
  await page.bringToFront();

  const completedTab = page.locator("ion-item", { hasText: "Completed" });
  await expect(completedTab).toBeVisible();
  await completedTab.click();
  await page.waitForTimeout(2000);
  const shipBtn = page.locator("ion-button.bulk-action", { hasText: "Ship" });
  await expect(shipBtn).toBeVisible();
  await shipBtn.click();

  await page.waitForTimeout(5000);

  const alert = page.locator("div.alert-wrapper");
  await expect(alert).toBeVisible();

  const shipAlertBtn = alert.getByText("Ship", { exact: true });
  await shipAlertBtn.click();
  await page.waitForTimeout(5000);
});
