import { expect, test } from '@playwright/test';
import { BopisOrdersPage} from '../pages/Order';



test('@flow Pack open order with rejection and print picklist', async ({ page }) => {
  const ordersPage = new BopisOrdersPage(page);

  // 1. Go to Orders Page
  await page.goto(process.env.CURRENT_APP_URL);

  // 2. Ensure we are on "Open" Tab
  await ordersPage.goToOpenTab();

  // 3. Identify first order card
  const firstCard = await ordersPage.getFirstOrderCard();
  await expect(firstCard).toBeVisible();
  const orderNameText=await ordersPage.getOrderTextFromCard(firstCard);

  /* const orderNameText='HCDEV#3494'; 
  const firstCard=await ordersPage.findCardByOrderName(orderNameText);*/

  // 4. Click the Print Picklist button (opens Assign Picker modal)
  await ordersPage.clickByTestId('print-picklist-button',0,firstCard)

  // 5. Wait for Assign Picker modal
  const modalHeader = page.getByTestId('assign-picker-modal-header');
  await expect(modalHeader).toBeVisible();

  // 6. Select picker and click Save (this triggers the first PDF tab)
  const radio = page.getByTestId('assign-picker-radio').first();
  await expect(radio).toBeVisible();
  await radio.click();

  const saveButton = page.getByTestId('assign-picker-save-button');
  await expect(saveButton).toBeVisible();


  const [firstPicklistTab] = await Promise.all([
    page.context().waitForEvent('page'),
    saveButton.click()
  ]);

  // 7. Picklist prints in new tab - verify
  await firstPicklistTab.waitForLoadState();
  const firstPicklistUrl = firstPicklistTab.url();
  expect(firstPicklistUrl).toBeTruthy();
  if (!(firstPicklistUrl.includes('blob:') || firstPicklistUrl.includes('.pdf'))) {
    throw new Error(`Unexpected picklist URL: ${firstPicklistUrl}`);
  }
  console.log('First picklist opened:', firstPicklistUrl);
  //await firstPicklistTab.close();
  await page.bringToFront();

  // 8. Search/find the same order again in list by name
  const sameOrderCard = await ordersPage.findCardByOrderName(orderNameText);
  await sameOrderCard.click();

  // 9. Verify order details page loaded
  const orderDetails = page.getByTestId('order-details-page');
  await expect(orderDetails).toBeVisible();

  // 10. Reject an Item in the Order

  // Click the trash icon button to start rejection
  await ordersPage.clickByTestId('select-rejected-item-button',0);

  // Select first rejection reason from the list
  await ordersPage.clickByTestId('select-rejection-reason-button',0);

  // Verify the Change Rejection Reason chip appears
  const rejectChip = page.getByTestId('change-rejection-reason-chip').first();
  await expect(rejectChip).toBeVisible();

  // Click "Reject Item" to confirm
  await ordersPage.clickByTestId('submit-rejected-items-button',0);

  await page.reload();

  // 11. Click Print Picklist again before packing
  const orderDetailPage = page.getByTestId('order-details-page');
  await expect(orderDetailPage).toBeVisible();

  const printButtonOnDetails = orderDetailPage.getByTestId('print-picklist-button');
  await expect(printButtonOnDetails).toBeVisible();

  const [secondPicklistTab] = await Promise.all([
    page.context().waitForEvent('page'),
    printButtonOnDetails.click(),
  ]);

 // 12. Verify second picklist in new tab
  await secondPicklistTab.waitForLoadState();
  const secondPicklistUrl = secondPicklistTab.url();
  expect(secondPicklistUrl).toBeTruthy();
  if (!(secondPicklistUrl.includes('blob:') || secondPicklistUrl.includes('.pdf'))) {
    throw new Error(`Unexpected picklist URL: ${secondPicklistUrl}`);
  }
  console.log('Second picklist opened:', secondPicklistUrl);
  await secondPicklistTab.close();
  await page.bringToFront();

  await page.waitForTimeout(5000);
  await page.reload();
  // 13. Click 'Ready for Pickup' to pack the order
  await ordersPage.clickByTestId('ready-pickup-button');
  
  // 14. Confirm in alert dialog
  const alertModal = page.locator('ion-alert');
  await expect(alertModal).toBeVisible();
  const confirmButton = alertModal.getByRole('button', { name: /ready for pickup/i });
  await expect(confirmButton).toBeVisible();
  await confirmButton.click();

  // 15. Go and check in packed Tab
  await page.goBack();
  await ordersPage.goToPackedTab();
  await page.waitForLoadState();
  const orderCard= await ordersPage.findCardByOrderName(orderNameText);
  await expect(orderCard).toHaveCount(1);
});