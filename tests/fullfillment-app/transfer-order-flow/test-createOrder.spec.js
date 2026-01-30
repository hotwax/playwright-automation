import { test } from "@playwright/test";

import TransferOrderFlowPage from "../../pages/fullfillment-app/transfer-orders/transfer-order-flow.page";

test("test-create order", async ({ page }) => {
  const transferOrderFlow = new TransferOrderFlowPage(page);
  await page.goto("https://fulfillment-dev.hotwax.io/open");
  await page.locator("#ion-input-0").fill("hotwax.user");
  await page.locator("#ion-input-1").fill("hotwax@786");
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForTimeout(2000);

  await transferOrderFlow.navigateToTransferOrders();
  await transferOrderFlow.createTransferOrder("Order Test", "Central");

  await transferOrderFlow.openSearchTab();
  await transferOrderFlow.searchAndAddProduct("MH08");
  await transferOrderFlow.searchAndAddProduct("MH02");
  await transferOrderFlow.searchAndAddProduct("MH01");

  await transferOrderFlow.setProductQuantity("product-card-btn-01", "12");
  await transferOrderFlow.bookProductByQoh("product-card-btn-02");
  await transferOrderFlow.removeProduct("product-card-btn-03");

  await transferOrderFlow.searchUsingViewMore(
    "Red",
    "MH09-M-Red10011Add to Transfer",
  );
  await transferOrderFlow.resetProductSearch();
  await transferOrderFlow.searchAndAddByResult(
    "SKU",
    "SKU11112121Add to Transfer",
  );
  await transferOrderFlow.resetProductSearch();
  await transferOrderFlow.closeViewMoreModal();

  await transferOrderFlow.packAndShipOrder("32563", "FEDEX TEST");
  await transferOrderFlow.goToCompletedTransfers();
});
