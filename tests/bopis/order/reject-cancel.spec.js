import { expect, test } from '@playwright/test';
import { BopisOrdersPage} from '../pages/Order';

// Single Item Order Rejection
test('Open Single Item order Rejection from order details page test', async ({ page }) => {

  await page.goto(process.env.CURRENT_APP_URL); 
  const bopis = new BopisOrdersPage(page);

  // Go to "Open" tab
  await bopis.goToOpenTab();
  
  // Click on the first order card
  await bopis.clickFirstOrderCard();  
  // Verify the Order Details Page is Loaded
  const orderDetail= page.getByTestId('order-details-page');
  await expect(orderDetail).toBeVisible();

  // Trash button
  await bopis.clickByTestId('select-rejected-item-button');

  // First rejection reason
  await bopis.clickByTestId('select-rejection-reason-button');

  // Change reason
  await bopis.clickByTestId('change-rejection-reason-chip');

  // Select reason again
  await bopis.clickByTestId('select-rejection-reason-button', 1);

  // Submit rejection
  await bopis.expectEnabled('submit-rejected-items-button');
  await bopis.clickByTestId('submit-rejected-items-button');

  // Verify the  item is rejected by checking the text All item are Rejected
  await bopis.verifyTextExists('All order items are rejected');

});

// Multiple Item Order Rejection
test('Open Multiple Item order Rejection from order details page test', async ({ page }) => {
  
await page.goto(process.env.CURRENT_APP_URL); 
  const bopis = new BopisOrdersPage(page);

  // Go to "Open" tab
  await bopis.goToOpenTab();
  
  // Click on the first order card
  await bopis.clickFirstOrderCard();  
  // Verify the Order Details Page is Loaded
  const orderDetail= page.getByTestId('order-details-page');
  await expect(orderDetail).toBeVisible();

  // Click Trash button  
  const trashButton=page.getByTestId('select-rejected-item-button');
  const totalItems = await trashButton.count();
  const firstItem = trashButton.first();
  await expect(firstItem).toBeVisible();
  await firstItem.click();

  // First rejection reason
  await bopis.clickByTestId('select-rejection-reason-button');

  // Submit rejection
  await bopis.expectEnabled('submit-rejected-items-button');
  await bopis.clickByTestId('submit-rejected-items-button');

  // Verify the  item is rejected by checking the Count of item  
  const availabelItem = orderDetail.getByTestId('select-rejected-item-button');
  await expect(availabelItem).toHaveCount(totalItems-1);
  
});

// Single Item order Cancellation 
test('Packed Single Item order Cancellation from order details page test', async ({ page }) => {
  
  await page.goto(process.env.CURRENT_APP_URL); 
  const bopis = new BopisOrdersPage(page);

  // Go to "Packed" tab
  await bopis.goToPackedTab();
  
  // Click on the first order card
  await bopis.clickFirstOrderCard();  

  // Verify the Order Details Page is Loaded
  const orderDetail= page.getByTestId('order-details-page');
  await expect(orderDetail).toBeVisible();

  // Trash button
  await bopis.clickByTestId('select-cancel-item-button', 0, orderDetail);

  // First rejection reason
  await bopis.clickByTestId('select-cancellation-reason-button');

  // Submit rejection
  await bopis.expectEnabled('submit-cancel-items-button');
  await bopis.clickByTestId('submit-cancel-items-button');

  expect(page.getByTestId("confirm-cancel-modal-header")).toBeVisible();
  await bopis.clickByTestId('confirm-cancellation-button');


  // Verify the  item is rejected by checking the text All item are Rejected
  await bopis.verifyTextExists('All order items are cancelled');

});

// Multiple Item  Order Cancellation
test('Packed Multiple Item order Cancellation from order details page test', async ({ page }) => {
  
  await page.goto(process.env.CURRENT_APP_URL); 
  const bopis = new BopisOrdersPage(page);

  // Go to "Packed" tab
  await bopis.goToPackedTab();
  
  // Click on the first order card
  await bopis.clickFirstOrderCard();  

  // Verify the Order Details Page is Loaded
  const orderDetail= page.getByTestId('order-details-page');
  await expect(orderDetail).toBeVisible();

  // Click Trash button  
  const trashButton=page.getByTestId('select-cancel-item-button');
  const totalItems = await trashButton.count();
  const firstItem = trashButton.first();
  await expect(firstItem).toBeVisible();
  await firstItem.click();

  // First rejection reason
  await bopis.clickByTestId('select-cancellation-reason-button');

  // Submit rejection
  await bopis.expectEnabled('submit-cancel-items-button');
  await bopis.clickByTestId('submit-cancel-items-button');

  expect(page.getByTestId("confirm-cancel-modal-header")).toBeVisible();
  await bopis.clickByTestId('confirm-cancellation-button');


  // Verify the  item is Cancelled by checking the Count of item
  const availabelItem = orderDetail.getByTestId('select-cancel-item-button');
  await expect(availabelItem).toHaveCount(totalItems - 1);

});
