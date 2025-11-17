import { test } from "@playwright/test";

import TransferOrderFlowPage from "../../pages/fullfillment-app/transfer-orders/transfer-order-flow.page";

test("test", async ({ page }) => {
  const transferOrderFlow = new TransferOrderFlowPage(page);

  await transferOrderFlow.navigateToTransferOrders();
  await transferOrderFlow.createTransferOrder("Order Test", "Central");

  await transferOrderFlow.openSearchTab();
  await transferOrderFlow.searchAndAddProduct("MH09");
  await transferOrderFlow.searchAndAddProduct("MH03");
  await transferOrderFlow.searchAndAddProduct("MH06");

  await transferOrderFlow.setProductQuantity("product-card-btn-01", "12");
  await transferOrderFlow.bookProductByQoh("product-card-btn-02");
  await transferOrderFlow.removeProduct("product-card-btn-03");

  await transferOrderFlow.searchUsingViewMore(
    "Red",
    "MH09-M-Red10011Add to Transfer"
  );
  await transferOrderFlow.resetProductSearch();
  await transferOrderFlow.searchAndAddByResult(
    "SKU",
    "SKU11112121Add to Transfer"
  );
  await transferOrderFlow.resetProductSearch();
  await transferOrderFlow.closeViewMoreModal();

  await transferOrderFlow.packAndShipOrder("32563", "FEDEX TEST");
  await transferOrderFlow.goToCompletedTransfers();
});
