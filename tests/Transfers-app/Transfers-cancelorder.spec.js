import { test, expect } from "@playwright/test";

test("Sanity | Transfer App | Cancel transfer order from Approved status", async ({
  page,
}) => {
  // Step 1: Open Transfer Order details page (logged-in URL)
  await page.goto(
    "https://transfers-dev.hotwax.io/login?oms=dev-maarg&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyTG9naW5JZCI6ImhvdHdheC51c2VyIiwiaXNzIjoiZGV2LW9tcyIsImV4cCI6MTc2ODYyNjAzNSwiaWF0IjoxNzY4NTM5NjM1fQ.661lJW_cpwkPAWI9t752F8vyUPMnbKsrt_G2ZOk9iKoX5tE5np0PQ5z5FaRoIu64312TUmLpHRDY_0DWLF-Hlg&expirationTime=1768626035952&omsRedirectionUrl=dev-oms"
  );

  // Step 2: Open transfer order
  const transferOrderRow = page.getByText("transfer order 46321hgdsf");
  await expect(transferOrderRow).toBeVisible();
  await transferOrderRow.click();

  // Step 3: Open specific item (optional but matches your flow)
  const itemRow = page.getByText("MH09-L-Blue MH09LBlue");
  await expect(itemRow).toBeVisible();
  await itemRow.click();

  // Step 4: Click on Approved status chip
  const approvedStatusChip = page.getByText("Approved", { exact: true });
  await expect(approvedStatusChip).toBeVisible();
  await approvedStatusChip.click();

  // Step 5: Select Cancel from dropdown
  const cancelOption = page.getByRole("menuitem", { name: "Cancel" });
  await expect(cancelOption).toBeVisible();
  await cancelOption.click();

  // Step 6: Verify status updated to Cancelled
  const cancelledStatus = page.getByText("Cancelled", { exact: true });
  await expect(cancelledStatus).toBeVisible();
});
