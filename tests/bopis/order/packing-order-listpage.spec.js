import { expect, test } from '@playwright/test';
import { BopisOrdersPage} from '../pages/Order';


// Pack order from list page when Tracking is  Enabled
test('Steps for Packing the Open Order From List Page (Tracking Enabled)', async ({ page }) => {
  await page.goto(process.env.CURRENT_APP_URL+'/tabs/orders'); 

  const bopis=new BopisOrdersPage(page);
  
  // Go to Open tab
  await bopis.goToOpenTab();

  // Get the first order card
  const openFirstCard= await bopis.getFirstOrderCard();
  await expect(openFirstCard).toBeVisible();
  await bopis.clickByTestId('ready-pickup-button', 0, openFirstCard);

  // Assign a Picker from the Modal Select the first available picker 
  await bopis.pickerModal(0);


  // Confirm the Ready for Pickup action
  await bopis.verifyTextExists('Order packed and ready for delivery');
});

// Pack order from list page when Tracking is  Disabled
test('Steps for Packing the Open Order From List Page (Tracking Disabled)', async ({ page }) => {
  await page.goto(process.env.CURRENT_APP_URL+'/tabs/orders'); 

  const bopis=new BopisOrdersPage(page);
  
  // Go to Open tab
  await bopis.goToOpenTab();

  // Get the first order card
  const openFirstCard= await bopis.getFirstOrderCard();
  await expect(openFirstCard).toBeVisible();
  await bopis.clickByTestId('ready-pickup-button', 0, openFirstCard);
  
  // Step 5: Confirm pickup in modal
  const pickupModal = page.locator('ion-alert');
  await expect(pickupModal).toBeVisible();

  await bopis.clickByRole('button', "ready for pickup",0,pickupModal);

  // Confirm the Ready for Pickup action
  await bopis.verifyTextExists('Order packed and ready for delivery');
});

