import { test } from "@playwright/test";

import TransferOrderFlowPage from "../../pages/fullfillment-app/transfer-orders/transfer-order-flow.page";

test("test", async ({ page }) => {
  const transferOrderFlow = new TransferOrderFlowPage(page);

  await transferOrderFlow.navigateToTransferOrders();
  await transferOrderFlow.createTransferOrder(
    "Discard Order Test 01",
    "central"
  );
  await transferOrderFlow.openSearchTab();
  await transferOrderFlow.searchAndAddProduct("MH09");
  await transferOrderFlow.discardOrder();
});
