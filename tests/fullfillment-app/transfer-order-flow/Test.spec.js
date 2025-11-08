import { test, expect } from '@playwright/test';

import TestTransferOrderPage from '../../../pages/fullfillment-app/transfer-orders/test.page';

test('test', async ({ page }) => {

 const trasferOrderPage = new TestTransferOrderPage(page)

 await trasferOrderPage.createTransferOrder("Order 123", "Central"); 

});
