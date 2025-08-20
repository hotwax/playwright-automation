import { test } from '@playwright/test';
import { PackedOrderPage } from '../pages/orders/pack-orders.page';
import { PackedDetailPage } from '../pages/order-detail/pack-order-detail.page';

// Case 1: Generate Packing Slip from List Page
test('Generate Packing Slip from List Page', async ({ page }) => {
  await page.goto(process.env.CURRENT_APP_URL);

  const packedOrders = new PackedOrderPage(page);
  await packedOrders.goToPackedTab();
  await packedOrders.printPackingSlipFromList();
});

// Case 2: Generate Packing Slip from Detail Page
test('Generate Packing Slip from Detail Page (Packed Tab)', async ({ page }) => {
  await page.goto(process.env.CURRENT_APP_URL);

  const packedOrders = new PackedOrderPage(page);
  const packedDetail = new PackedDetailPage(page);

  await packedOrders.goToPackedTab();
  await packedOrders.openFirstOrderDetail();
  await packedDetail.verifyDetailPageVisible();
  await packedDetail.printPackingSlipFromDetail();
});
