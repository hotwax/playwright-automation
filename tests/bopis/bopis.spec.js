import { test } from '@playwright/test';

test('BOPIS order ready for pickup flow', async ({ page }) => {
  await page.goto(process.env.CURRENT_APP_URL + '/tabs/orders'); // REQUIRED to open the app

  // Optional: wait for page to settle
  await page.waitForLoadState('networkidle');
});
