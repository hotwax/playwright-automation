import { test } from "@playwright/test";

import TransferOrderFlowPage from "../../pages/fullfillment-app/transfer-orders/transfer-order-flow.page";

test("test-discardorder", async ({ page }) => {
  const transferOrderFlow = new TransferOrderFlowPage(page);
  page.goto("https://fulfillment-dev.hotwax.io/open");
  await page.locator("#ion-input-0").fill("hotwax.user");
  await page.locator("#ion-input-1").fill("hotwax@786");
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForTimeout(2000);

  await transferOrderFlow.navigateToTransferOrders();
  await transferOrderFlow.createTransferOrder(
    "Discard Order Test 01",
    "central",
  );
  await transferOrderFlow.openSearchTab();
  await transferOrderFlow.searchAndAddProduct("MH09");
  await transferOrderFlow.discardOrder();
});
