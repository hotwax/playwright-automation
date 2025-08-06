import { test,expect} from '@playwright/test';

test('Pack order from order details page test', async ({ page }) => {

    await page.goto(process.env.CURRENT_APP_URL+'/tabs/orders'); 
    // Click on the first Order Card
    const orderCard = page.getByTestId('order-card').first();
    await orderCard.click();
    
    // Verify the Order Details Page is Loaded
    const orderDetailsPage = page.getByTestId('order-details-page');
    await expect(orderDetailsPage).toBeVisible();
    
    // Click the "Ready for Pickup" Button
    const readyPickupButton = orderDetailsPage.getByTestId('ready-pickup-button');
    await expect(readyPickupButton).toBeVisible();
    await readyPickupButton.click();

    // Check if Picker Selection Modal Appears  Select the first available picker 
    const pickerModal = page.getByTestId('assign-picker-modal-header');
    await expect(pickerModal).toBeVisible();

    try {
      const pickerOption= page.getByTestId('assign-picker-radio').first();
      await expect(pickerOption).toBeVisible();
      await pickerOption.click();

      const savePickerButton = page.getByTestId('assign-picker-save-button');
      await expect(savePickerButton).toBeVisible();
      await savePickerButton.click();
    } catch (error) {
        console.error(`Something went wrong: ${error.message}`);
    }

    // Verify Confirmation Message that Order is Packed 
    const packedConfirmationText = page.getByTestId('ready-handover-label');
    await expect(packedConfirmationText).toHaveText('Order is now ready to handover.');
    await expect(packedConfirmationText).toBeVisible();
    
});
