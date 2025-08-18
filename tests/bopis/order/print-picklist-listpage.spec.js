import { expect, test } from '@playwright/test';
import { BopisOrdersPage} from '../pages/Order';


// Print picklist from list page (Case 1:Picker Unassigned)
test('Print Picklist from Open List Page (Picker Not Assigned)', async ({ page }) => {
  
  await page.goto(process.env.CURRENT_APP_URL);

  const bopis = new BopisOrdersPage(page);
  // Step 2: Go to "Open" tab
  await bopis.goToOpenTab();
  
  // Click on the PrintPicklist btn of open Order Card 
  const openFirstCard = page.getByTestId('order-card').first();
  const printPicklist = openFirstCard.getByTestId('print-picklist-button');
  await expect(printPicklist).toBeVisible();
  await printPicklist.click();

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

// Print picklist from list page (Case 2:Picker Assigned)
test('Print Picklist from Open List Page (Picker Already Assigned)', async ({ page }) => {
  
  await page.goto(process.env.CURRENT_APP_URL);

  const bopis = new BopisOrdersPage(page);
  // Step 2: Go to "Open" tab
  await bopis.goToOpenTab();
  
  // Click on the PrintPicklist btn of open Order Card 
  const openFirstCard = page.getByTestId('order-card').first();
  const printPicklist = openFirstCard.getByTestId('print-picklist-button');
  await expect(printPicklist).toBeVisible();
  await printPicklist.click();

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


