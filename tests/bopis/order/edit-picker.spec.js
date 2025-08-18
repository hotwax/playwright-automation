import { expect, test } from '@playwright/test';
import { BopisOrdersPage} from '../pages/Order';


// Edit picker from Open detail page
test('Edit Picker from Order Detail Page (In Open Tab)', async ({ page }) => {
  
  await page.goto(process.env.CURRENT_APP_URL);

  const bopis = new BopisOrdersPage(page);
  //  Go to "Open" tab
  await bopis.goToOpenTab();
  
  //  Open Order Card 
  await bopis.clickFirstOrderCard();

  // Wait for the order details page to load
  const orderDetailPage= page.getByTestId('order-details-page');
  await expect(orderDetailPage).toBeVisible();

  // click the edit picker modal
  await bopis.clickByTestId('edit-picker-chip');
  
  // Wait for the editpicker modal to open
  try {
    const editPickerModalheader = page.getByTestId('edit-picker-modal-header');
    await expect(editPickerModalheader).toBeVisible();
    const getallradio= page.getByTestId('edit-picker-radio');
    // now select which first radio is not already selected
    const selectedIndex = await getallradio.evaluateAll((radios) => {
      return radios.findIndex(radio => !radio.checked);
    });
    await bopis.clickByTestId('edit-picker-radio', selectedIndex);
    await bopis.clickByTestId('edit-picker-save-button');
    await bopis.clickByRole('button', 'Replace');
    await bopis.verifyTextExists('Pickers successfully replaced in the picklist with the new selections.');

  } catch (error) {
    console.error(`Something went wrong: ${error.message}`);
  }

})

// Edit picker from Packed detail page
test('Edit Picker from Order Detail Page (In Packed Tab)', async ({ page }) => {
  
  await page.goto(process.env.CURRENT_APP_URL);

  const bopis = new BopisOrdersPage(page);
  // Step 2: Go to packed tab
  await bopis.goToPackedTab();
  
  //  Open Order Card 
  await bopis.clickFirstOrderCard();

  // Wait for the order details page to load
  const orderDetailPage= page.getByTestId('order-details-page');
  await expect(orderDetailPage).toBeVisible();

  // click the edit picker modal
  await bopis.clickByTestId('edit-picker-chip');
  
  // Wait for the editpicker modal to open
  try {
    const editPickerModalheader = page.getByTestId('edit-picker-modal-header');
    await expect(editPickerModalheader).toBeVisible();
    const getallradio= page.getByTestId('edit-picker-radio');
    // now select which first radio is not already selected
    const selectedIndex = await getallradio.evaluateAll((radios) => {
      return radios.findIndex(radio => !radio.checked);
    });
    await bopis.clickByTestId('edit-picker-radio', selectedIndex);
    await bopis.clickByTestId('edit-picker-save-button');
    await bopis.clickByRole('button', 'Replace');
    await bopis.verifyTextExists('Pickers successfully replaced in the picklist with the new selections.');

  } catch (error) {
    console.error(`Something went wrong: ${error.message}`);
  }

})
