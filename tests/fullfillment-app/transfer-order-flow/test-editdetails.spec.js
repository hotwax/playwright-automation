import { test } from "@playwright/test";

import TransferOrderFlowPage from "../../pages/fullfillment-app/transfer-orders/transfer-order-flow.page";

test("test", async ({ page }) => {
  const transferOrderFlow = new TransferOrderFlowPage(page);

  await transferOrderFlow.navigateToTransferOrders();
  await transferOrderFlow.createTransferOrder(
    "Order Test",
    "Central warehouse"
  );
  await transferOrderFlow.editTransferOrderName("ty-02");
  await transferOrderFlow.updateStoreForTransferOrder("Miami2 MIAMI2");
});
