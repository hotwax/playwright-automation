import { expect, test } from '@playwright/test';
import { BopisOrdersPage} from '../pages/Order';

// Print picklist from Detail page (Case 1:Picker Unassigned)
test('Print Picklist from Open Detail Page (Picker Not Assigned)', async ({ page }) => {
  
  await page.goto(process.env.CURRENT_APP_URL);

  const bopis = new BopisOrdersPage(page);

  // Go to "Open" tab
  await bopis.goToOpenTab();
    
  // Open Order Card 
  await bopis.clickFirstOrderCard();

  // Wait for the order details page to load
  const orderDetailPage= page.getByTestId('order-details-page');
  await expect(orderDetailPage).toBeVisible();

  // Click on the PrintPicklist btn of open Order Card
  await bopis.clickByTestId('print-picklist-button', 0, orderDetailPage); 

  // Wait for the modal to open
  await bopis.pickerModal(1);
  
  //wait for the popup 
  const popupPromise = page.waitForEvent('popup').catch(() => null);

  // verify that a popup was opened
  const result = await Promise.race([popupPromise]);
  if (result && result.url) {
    const url = result.url();
    expect(url).toMatch(/(blob|pdf)/);
    console.log(`Blob URL opened in new tab: ${url}`);
  } else {
    throw new Error('No Print Picklist.');
  }

})

// Print picklist from Detail page (Case 2:Picker Assigned)
test('Print Picklist from Open Detail Page (Picker Already Assigned)', async ({ page }) => {
  
  await page.goto(process.env.CURRENT_APP_URL);

  const bopis = new BopisOrdersPage(page);

  // Go to "Open" tab
  await bopis.goToOpenTab();
    
  // Open Order Card 
  await bopis.clickFirstOrderCard();

  // Wait for the order details page to load
  const orderDetailPage= page.getByTestId('order-details-page');
  await expect(orderDetailPage).toBeVisible();

  // Click on the PrintPicklist btn of open Order Card
  await bopis.clickByTestId('print-picklist-button', 0, orderDetailPage); 

  //wait for the popup 
  const popupPromise = page.waitForEvent('popup').catch(() => null);

  const result = await Promise.race([popupPromise]);
  if (result && result.url) {
    const url = result.url();
    expect(url).toMatch(/(blob|pdf)/);
    console.log(`Blob URL opened in new tab: ${url}`);
  } else {
    throw new Error('No Print Picklist.');
  }
})
