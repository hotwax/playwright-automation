export default class TransferOrderFlowPage {
  constructor(page) {
    this.page = page;

    // Landing and creation flow
    this.transferOrdersLink = page.getByText("Transfer Orders");
    this.createTransferOrderBtn = page.getByTestId("create-transfer-order-btn");
    this.transferNameInput = page.getByRole("textbox", {
      name: "Transfer name",
    });
    this.facilitySearchInput = page.getByRole("searchbox", {
      name: "search text",
    });
    this.facilityRadioOptions = page.getByTestId("facility-radio-options");
    this.saveTransferOrderBtn = page.getByTestId("save-transfer-order-btn");

    // Order details - search and items
    // this.searchTab = page.locator("ion-segment-button").nth(1);
    this.searchTab = page.locator("ion-segment-button[content-id='search']");
    this.productSearchInput = page
      .getByTestId("search-product-input")
      .getByRole("searchbox", { name: "search text" });
    this.addToTransferButton = page
      .getByRole("button", { name: "Add to Transfer" })
      .first();
    this.viewMoreResultsButton = page.getByTestId("view-more-results");
    this.resetButton = page.getByRole("button", { name: "reset" });
    this.viewMoreCloseModal = page.getByTestId("viewmore-close-modal");
    this.discardOrderButton = page.getByRole("button", {
      name: "Discard order",
    });
    this.shipLaterButton = page.getByRole("button", { name: "Ship later" });
    this.shipLaterContinueButton = page.getByTestId("shiplater-continue-btn");

    // Pack & ship actions
    this.packAndShipButton = page.getByRole("button", {
      name: "Pack and ship order",
    });
    this.manualTrackingTab = page.getByText("Manual tracking");
    this.carrierDropdown = page.getByText("Carrier_NA_");
    this.trackingCodeGroup = page.getByTestId("tracking-code-input");
    this.trackingCodeInput = page.getByRole("textbox", {
      name: "Tracking code",
    });
    this.shipOrderButton = page.getByRole("button", { name: "Ship order" });
    this.completedTransferOrdersTab = page.getByTestId(
      "completed-transfer-orders-tab",
    );

    // Edit order details
    this.orderNameEditButton = page
      .getByTestId("order-name-edit-btn")
      .getByRole("button", { name: "Edit" });
    this.orderNameEditInput = page.getByTestId("edited-order-name-input");
    this.saveEditedOrderNameBtn = page.getByTestId(
      "save-edited-transfer-order-name-btn",
    );
    this.storeNameEditButton = page
      .getByTestId("store-name-edit-btn")
      .locator("button");
    this.updateStoreNameBtn = page.getByTestId(
      "update-store-name-transfer-order-btn",
    );

    // Ship later fulfilment
    this.pickAllButton = page.getByRole("ion-button", { name: "PICK ALL" });
    this.createShipmentButton = page.getByRole("ion-button", {
      name: " Create shipment",
    });
    this.confirmCreateShipmentButton = page.getByRole("button", {
      name: "Create",
    });
  }

  async navigateToTransferOrders() {
    await this.page.waitForTimeout(5000);
    await this.page.goto("https://fulfillment-dev.hotwax.io/open");
    await this.page.waitForTimeout(2000);
    await this.transferOrdersLink.click();
  }

  async createTransferOrder(orderName, facilityName) {
    await this.page.waitForTimeout(5000);
    await this.createTransferOrderBtn.locator("path").nth(1).click();
    await this.transferNameInput.fill(orderName);
    await this.facilitySearchInput.fill(facilityName);
    await this.facilityRadioOptions.click();
    await this.saveTransferOrderBtn.click();
    await this.page.waitForTimeout(5000);
  }

  async openSearchTab() {
    await this.searchTab.click();
  }

  async searchAndAddProduct(productCode) {
    await this.productSearchInput.click();
    await this.productSearchInput.fill(productCode);
    await this.addToTransferButton.click();
    await this.page.waitForTimeout(5000);
  }

  async setProductQuantity(productCardTestId, quantity) {
    const qtyInput = this.page
      .getByTestId(productCardTestId)
      .getByRole("spinbutton", { name: "Qty" });
    await qtyInput.click();
    await qtyInput.fill(quantity);
    await this.page.waitForTimeout(5000);
  }

  async bookProductByQoh(productCardTestId = "product-card-btn-02") {
    await this.page
      .getByTestId(productCardTestId)
      .locator("div")
      .filter({ hasText: /^Book qoh$/i })
      .click();
    await this.page.waitForTimeout(5000);
  }

  async removeProduct(productCardTestId = "product-card-btn-03") {
    await this.page
      .getByTestId(productCardTestId)
      .getByTestId("remove-item-btn")
      .getByRole("img")
      .click();
    await this.page.waitForTimeout(5000);
  }

  getProductRowButton(rowText) {
    return this.page
      .locator("ion-item")
      .filter({ hasText: rowText })
      .getByRole("button", { name: /Add to Transfer/i });
  }

  async searchUsingViewMore(searchTerm, rowText) {
    await this.productSearchInput.fill(searchTerm);
    await this.viewMoreResultsButton.locator("svg").click();
    await this.getProductRowButton(rowText).click();
    await this.page.waitForTimeout(5000);
  }

  async searchAndAddByResult(searchTerm, rowText) {
    await this.productSearchInput.click();
    await this.productSearchInput.fill(searchTerm);
    await this.productSearchInput.press("Enter");
    await this.getProductRowButton(rowText).click();
    await this.page.waitForTimeout(5000);
  }

  async resetProductSearch() {
    await this.resetButton.click();
  }

  async closeViewMoreModal() {
    await this.viewMoreCloseModal.getByRole("button").click();
    await this.page.waitForTimeout(5000);
  }

  async packAndShipOrder(trackingCode, carrierName = "FEDEX TEST") {
    await this.packAndShipButton.click();
    await this.manualTrackingTab.click();
    await this.carrierDropdown.click();
    await this.page.getByRole("radio", { name: carrierName }).click();
    await this.trackingCodeGroup.locator("label").click();
    await this.trackingCodeInput.fill(trackingCode);
    await this.shipOrderButton.click();
    await this.page.waitForTimeout(5000);
  }

  async goToCompletedTransfers() {
    await this.completedTransferOrdersTab.click();
  }

  async discardOrder() {
    await this.discardOrderButton.click();
    await this.page.waitForTimeout(3000);
  }

  async editTransferOrderName(newName) {
    await this.orderNameEditButton.click();
    await this.orderNameEditInput.click();
    await this.orderNameEditInput.fill(newName);
    await this.saveEditedOrderNameBtn.click();
  }

  async updateStoreForTransferOrder(storeLabel) {
    await this.storeNameEditButton.click();
    await this.page.getByRole("radio", { name: storeLabel }).click();
    await this.updateStoreNameBtn.locator("path").nth(1).click();
  }

  async markOrderToShipLater() {
    await this.shipLaterButton.click();
    await this.page.waitForTimeout(3000);
    await this.shipLaterContinueButton.click();
    await this.page.waitForTimeout(5000);
  }

  async fulfillShipLaterOrder(orderName) {
    await this.page.getByText(orderName).click();
    await this.pickAllButton.click();
    await this.createShipmentButton.click();
    await this.page.waitForTimeout(1000);
    await this.confirmCreateShipmentButton.click();
  }
}
