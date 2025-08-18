
import { test, expect } from '@playwright/test';
import { BopisOrdersPage } from '../pages/Order';


test(' Steps to Handover the order from Orders list page', async ({ page }) => {
  await page.goto(process.env.CURRENT_APP_URL+'/tabs/orders'); 
  const bopis=new BopisOrdersPage(page);
  
  //  Go to packed tab
  await bopis.goToPackedTab();

  //  Get the first packed order card
  const packedFirstCard = page.getByTestId('order-card').first();
  await expect(packedFirstCard).toBeVisible();

  // Capture unique order name for packed and completed tabs
  const orderName= await bopis.getOrderTextFromCard(packedFirstCard);
  if (!orderName) throw new Error('Order name not found on Open tab');
  
  //  Handover the order
  await bopis.clickHandover(packedFirstCard);
  
  const toast = page.getByText(`Order delivered to`); 
  await expect(toast).toBeVisible();

  //  Switch to Completed Tab
  await bopis.goToCompletedTab();

  //  Assert the same order name exists in completed tab
  const orderInCompleted = await bopis.findCardByOrderName(orderName);
  await expect(orderInCompleted).toHaveCount(1);

});


test('Steps to Handover the order from Order Detail Packed page', async ({ page }) => {
  await page.goto(process.env.CURRENT_APP_URL+'/tabs/orders'); 
  
  const bopis = new BopisOrdersPage(page);
  
  //  Go to packed tab
  await bopis.goToPackedTab();

  //  Get the first packed order card
  const packedFirstCard = await bopis.getFirstOrderCard();
  await expect(packedFirstCard).toBeVisible();
  await packedFirstCard.click();

  // capture unique order name for packed and completed tabs
  const orderName= await bopis.getOrderTextFromCard(packedFirstCard);
  if (!orderName) throw new Error('Order name not found on Open tab');

  // Verify the Order Details Page is Loaded
  const orderDetailsPage = page.getByTestId('order-details-page');
  await expect(orderDetailsPage).toBeVisible();

  // Click the "Ready for Handover" Button
  const handoverButton = orderDetailsPage.getByTestId('handover-button');
  await expect(handoverButton).toBeVisible();
  await handoverButton.click();

  // Get the handover button inside confirmation alert    
  await bopis.clickByRole('button', 'Handover');

  // Go back to the previous page
  await page.goBack();

  // Switch to Completed Tab
  await bopis.goToCompletedTab();

  const completedOrderCards = page.getByTestId('order-card');
  await expect(completedOrderCards.first()).toBeVisible();

  // Assert the same order name exists in completed tab
  const orderInCompleted = await bopis.findCardByOrderName(orderName);
  await expect(orderInCompleted).toHaveCount(1);

});


