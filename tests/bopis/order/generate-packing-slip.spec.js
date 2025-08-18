import { expect, test } from '@playwright/test';
import { BopisOrdersPage} from '../pages/Order';

// Packing Slip from list page (Case 1:List Page)
test('Generate Packing Slip from List Page ', async ({ page }) => {
  
  await page.goto(process.env.CURRENT_APP_URL);

  const bopis = new BopisOrdersPage(page);
  //  Go to "Packed" tab
  await bopis.goToPackedTab();

  // Click on the PrintPicklist btn of packed Order Card
  const packedFirstCard = page.getByTestId('order-card').first();
  const packingButton = packedFirstCard.getByTestId('packing-slip-button');
  await expect(packingButton).toBeVisible();
  await packingButton.click();

  //wait for the popup 
  const popupPromise = page.waitForEvent('popup').catch(() => null);

  const result = await Promise.race([popupPromise]);
  if (result && result.url) {
    const url = result.url();
    expect(url).toMatch(/(blob|pdf)/);
    console.log(`Blob URL opened in new tab: ${url}`);
  } else {
      throw new Error('No blob URL detected after clicking Print Picklist.');
  }
})

// Packing Slip from detail page (Case 2:Detail Page)
test('Generate Packing Slip from Detail Page (Packed Tab) ', async ({ page }) => {
  
  await page.goto(process.env.CURRENT_APP_URL);

  const bopis = new BopisOrdersPage(page);
  // Go to "Packed" tab
  await bopis.goToPackedTab();

  // Click on the PrintPicklist btn of packed Order Card
  const packedFirstCard = page.getByTestId('order-card').first();
  await packedFirstCard.click();

  //  expect the detail page to be visible
  const detailPage= page.getByTestId('order-details-page');
  await expect(detailPage).toBeVisible();

  // Click the packing slip button
  const packingButton = detailPage.getByTestId('packing-slip-button');
  await expect(packingButton).toBeVisible();
  await packingButton.click();

  //wait for the popup 
  const popupPromise = page.waitForEvent('popup').catch(() => null);

  const result = await Promise.race([popupPromise]);
  if (result && result.url) {
    const url = result.url();
    expect(url).toMatch(/(blob|pdf)/);
    console.log(`Blob URL opened in new tab: ${url}`);
  } else {
      throw new Error('No blob URL detected after clicking Print Picklist.');
  }
})