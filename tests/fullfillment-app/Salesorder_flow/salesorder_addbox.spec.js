import { test, expect } from "@playwright/test";

test("Sanity | Fulfillment order flow - Pick, Pack and Ship", async ({
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
  //Assertion: Ensure Open Orders page is loaded
  // Ensure Open tab is visible (Ionic-safe)
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

  // Handle new tab for PDF
  const [pdfPage] = await Promise.all([
    page.context().waitForEvent("page"), //  waits for new tab
    saveBtn.click(), //  triggers PDF tab
  ]);
  await page.waitForTimeout(2000);
  // Wait for PDF to load
  await pdfPage.waitForLoadState();

  // Close the PDF tab
  await pdfPage.close();

  // Wait for modal to close
  await expect(modal).toBeHidden();

  await page.waitForTimeout(2000);

  // Navigate to In Progress tab
  const inProgressTab = page.locator("ion-item", { hasText: "In Progress" });

  await expect(inProgressTab).toBeVisible();
  await inProgressTab.click();
  await page.waitForTimeout(2000);

  // click on Add Box
  const orders = page.locator("ion-card.order");
  const orderCount = await orders.count();

  console.log("Total orders:", orderCount);

  //Wait to visually confirm orders loaded
  await page.waitForTimeout(3000);

  let addBoxClicked = false;

  for (let i = 0; i < orderCount; i++) {
    const order = orders.nth(i);

    // Pause before processing each order card
    await page.waitForTimeout(1500);

    // Count line items in this order
    const lineItems = order.locator(".order-line-item");
    const itemCount = await lineItems.count();

    console.log(`Order ${i + 1} item count: ${itemCount}`);

    // Pause to observe item count decision
    await page.waitForTimeout(1500);

    // Business rule: Add Box only if 2+ items
    if (itemCount >= 2) {
      const addBoxBtn = order.locator(
        'ion-button:has-text("Add Box"):not([disabled]):not([aria-disabled="true"])',
      );

      if ((await addBoxBtn.count()) > 0) {
        // Pause before scrolling
        await page.waitForTimeout(1500);

        await addBoxBtn.scrollIntoViewIfNeeded();

        // Pause after scroll so you can see it
        await page.waitForTimeout(1500);

        await expect(addBoxBtn).toBeVisible();

        // Pause before click (this is the best one to watch)
        await page.waitForTimeout(2000);

        await addBoxBtn.click();

        console.log(`Clicked Add Box on order ${i + 1}`);

        // Pause after click to see modal open
        await page.waitForTimeout(4000);

        addBoxClicked = true;
        break;
      }
    } else {
      console.log(`⏭ Skipping order ${i + 1} (only ${itemCount} item)`);

      // Pause to visually confirm skip
      await page.waitForTimeout(1500);
    }
  }

  // Final pause before assertion
  await page.waitForTimeout(3000);

  // Hard assertion so test fails clearly if rule is broken
  expect(addBoxClicked).toBeTruthy();
  await page.waitForTimeout(2000);
});
