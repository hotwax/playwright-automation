import { test,expect} from '@playwright/test';

test('Ready for pickup test', async ({ page }) => {
  await page.goto(process.env.CURRENT_APP_URL + '/tabs/orders'); 
  
  // Go to setting tab
  await page.locator('#tab-button-more svg').click();

  // get toggle value by label text
  const toggle = page.locator(`ion-toggle:has-text("Enable tracking")`);
  const input = toggle.locator('input.aux-input');
  const valueEnable = await input.getAttribute('value')

  page.goBack();

  await page.waitForLoadState('networkidle');
  
 
  await page.getByTestId('open-segment-button').click();

  const openFirstCard = page.getByTestId('open-order-card').first();
  const readyButton = openFirstCard.getByTestId('ready-pickup-button');
  await expect(readyButton).toBeVisible({ timeout: 2000 });
  await readyButton.click();

  if (valueEnable==='on') {
   // modal for picker selection
    try {
      await page.getByRole('radio').first().click();
      const assignButton = page.getByTestId('assign-picker-modal-button');
      await expect(assignButton).toBeVisible({ timeout: 5000 });
      await assignButton.click();
    } catch (error) {
      console.error(`Something went wrong ${error.message}`);
    }
  } else {
    //  Confirm in modal if it appears
    try {
      const confirmModalButton = page.locator('button:has-text("Ready for pickup")').first();
      await expect(confirmModalButton).toBeVisible({ timeout: 5000 });
      console.log('Ready for pickupButton:', await confirmModalButton.isEnabled());
      await confirmModalButton.click();
    } catch (error) {
      console.error(`Something went wrong ${error.message}`);
    }
  }
});
