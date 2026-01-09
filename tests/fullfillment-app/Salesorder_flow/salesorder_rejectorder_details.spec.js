import { test, expect } from "@playwright/test";

test("Sanity | Fulfillment | Reject single order via details page", async ({
  page,
}) => {
  // Step 1: Open order from list
  const orderCard = page.locator("ion-chip").nth(2);
  await expect(orderCard).toBeVisible();
  await orderCard.click();

  // Step 2: View order details
  const viewDetailsBtn = page.getByRole("button", { name: "View details" });
  await expect(viewDetailsBtn).toBeVisible();
  await viewDetailsBtn.click();

  // Step 3: Pick the order
  const pickOrderBtn = page.getByRole("button", { name: "Pick order" });
  await expect(pickOrderBtn).toBeVisible();
  await pickOrderBtn.click();

  // Step 4: Select picker
  const picker = page
    .getByRole("listitem")
    .filter({ hasText: "Catherine Mendeley" })
    .locator("label");

  await expect(picker).toBeVisible();
  await picker.click();

  // Step 5: Open action menu (FAB)
  const actionFab = page.locator("ion-fab-button").nth(1);
  await expect(actionFab).toBeVisible();
  await actionFab.click();

  // Step 6: Report an issue
  const reportIssueBtn = page
    .locator("ion-button")
    .filter({ hasText: "Report an issue" })
    .locator("button");

  await expect(reportIssueBtn).toBeVisible();
  await reportIssueBtn.click();

  // Step 7: Select issue reason
  const issueReasonBtn = page.getByRole("button", { name: "FOR TESTING" });
  await expect(issueReasonBtn).toBeVisible();
  await issueReasonBtn.click();

  // Step 8: Reject order
  const rejectOrderBtn = page.getByRole("button", { name: "Reject order" });
  await expect(rejectOrderBtn).toBeVisible();
  await rejectOrderBtn.click();

  // Step 9: Confirm rejection
  const reportConfirmBtn = page.getByRole("button", { name: "Report" });
  await expect(reportConfirmBtn).toBeVisible();
  await reportConfirmBtn.click();
});
