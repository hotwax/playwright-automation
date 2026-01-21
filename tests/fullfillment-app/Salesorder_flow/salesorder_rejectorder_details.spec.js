import { test, expect } from "@playwright/test";

test("Sanity | Fulfillment | Reject single order via details page", async ({
  page,
}) => {
  // Step 1: Navigate to Open Orders page
  await page.goto("https://fulfillment-dev.hotwax.io/open");
  await page.waitForTimeout(2000);

  await page.locator("#ion-input-0").fill("hotwax.user");
  await page.locator("#ion-input-1").fill("hotwax@786");
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForTimeout(2000);

  // Assertion: Ensure Open Orders page is loaded
  // Ensure Open tab is visible (Ionic-safe)
  const openTab = page.locator("text=Open").first();
  await expect(openTab).toBeVisible();

  // Step 2: Open order from list
  const orderCard = page.locator("ion-chip").nth(0);
  await expect(orderCard).toBeVisible();
  await orderCard.click();
  await page.waitForTimeout(2000);

  // Step 2: View order details
  const viewDetailsBtn = page.getByRole("button", { name: "View details" });
  await expect(viewDetailsBtn).toBeVisible();
  await viewDetailsBtn.click();

  // Step 3: Pick the order
  const pickOrderBtn = page.getByRole("button", { name: "Pick order" });
  await expect(pickOrderBtn).toBeVisible();
  await pickOrderBtn.click();
  await page.waitForTimeout(2000);

  // Step 4: Select first available picker
  // const picker = page.locator("ion-item").first();
  // await expect(picker).toBeVisible();
  // await picker.click();

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
  // await expect(saveBtn).not.toHaveClass(/fab-button-disabled/);
  // await saveBtn.click();

  await page.waitForTimeout(2000);

  const [pdfPage] = await Promise.all([
    page.context().waitForEvent("page"), // 👈 waits for new tab
    saveBtn.click(), // 👈 triggers PDF tab
  ]);
  await page.waitForTimeout(2000);
  // Wait for PDF to load
  await pdfPage.waitForLoadState();

  // Close the PDF tab
  await pdfPage.close();

  // Wait for modal to close
  await expect(modal).toBeHidden();

  await page.waitForTimeout(2000);

  // step 6: Click on 'Report an issue' button
  const reportIssueBtn = page
    .locator("ion-button", { hasText: "Report an issue" })
    .filter({ has: page.locator(":not([aria-disabled='true'])") })
    .first();

  await reportIssueBtn.click();

  // Step 7: Select issue reason
  await page
    .locator("ion-popover:visible ion-item", { hasText: "FOR TESTING" })
    .click();
  await page.waitForTimeout(2000);

  // Step 8: Reject order
  const rejectOrderBtn = page
    .locator("div.actions")
    .locator("ion-button", { hasText: "Reject order" });

  await expect(rejectOrderBtn).toBeVisible();
  await expect(rejectOrderBtn).not.toHaveAttribute("aria-disabled", "true");
  await rejectOrderBtn.click();
  await page.waitForTimeout(2000);

  // Step 9: Confirm rejection
  const reportBtn = page
    .locator(".alert-wrapper")
    .locator("button.alert-button-role-confirm");

  await expect(reportBtn).toBeVisible();
  await reportBtn.click();
  await page.waitForTimeout(2000);
});
