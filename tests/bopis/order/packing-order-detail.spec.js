import { expect, test } from '@playwright/test';
import { BopisOrdersPage} from '../pages/Order';

// Packed order from Open detail page by Assigning the Picker when the Enable Tracking is on
test('Pack order from order details page (Tracking Enabled)', async ({ page }) => {
  
  await page.goto(process.env.CURRENT_APP_URL);

  const bopis = new BopisOrdersPage(page);
  // Step 2: Go to Open tab
  await bopis.goToOpenTab();
  
  // Open Order Card 
  await bopis.clickFirstOrderCard();

  // Wait for the order details page to load
  const orderDetailPage= page.getByTestId('order-details-page');
  await expect(orderDetailPage).toBeVisible();

  // Click the Ready Pickup Button
  await bopis.clickByTestId('ready-pickup-button',0,orderDetailPage);

  // Assign the Picker from Open detail
  await bopis.pickerModal(1);

  // verify that success label are now visible
  const successLabel = page.getByTestId('ready-handover-label');
  await expect(successLabel).toBeVisible();
  

})

// Packed order from Open detail page when the Enable Tracking is off
test(' Packing the Order from Detail Page (Tracking Disabled)', async ({ page }) => {
  
  await page.goto(process.env.CURRENT_APP_URL);

  const bopis = new BopisOrdersPage(page);
  // Step 2: Go to Open tab
  await bopis.goToOpenTab();
  
  // Open Order Card 
  await bopis.clickFirstOrderCard();

  // Wait for the order details page to load
  const orderDetailPage= page.getByTestId('order-details-page');
  await expect(orderDetailPage).toBeVisible();

  // Click the Ready Pickup Button
  await bopis.clickByTestId('ready-pickup-button',0,orderDetailPage);

    // Step 5: Confirm pickup in modal
  const pickupModal = page.locator('ion-alert');
  await expect(pickupModal).toBeVisible();

  await bopis.clickByRole('button', "ready for pickup",0,pickupModal );
  
  // verify that success label are now visible
  const successLabel = page.getByTestId('ready-handover-label');
  await expect(successLabel).toBeVisible();

})