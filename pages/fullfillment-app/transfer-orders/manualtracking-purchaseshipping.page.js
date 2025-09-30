// pages/shippingPage.js
import { expect } from "@playwright/test";

export class ShippingPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Tabs
    this.manualTrackingTab = page.getByText("Manual tracking");
    this.purchaseLabelTab = page.getByText("Purchase shipping label");

    // Manual tracking elements
    this.carrierDropdown = page.getByTestId("select-carrier-dropdown");
    this.carrierOption = page.getByTestId("select-carrier-dropdown-option").first();
    this.trackingInput = page.getByTestId("tracking-code-input");
    this.methodDropdown = page.getByTestId("select-method-dropdown");
    this.methodOption = page.getByTestId("select-method-dropdown-option").first();
    this.trackingTestLink = page.getByTestId("tracking-test-link");
    this.shipOrderButton = page.getByTestId("ship-order-btn");

    // Purchase shipping label elements
    this.purchaseLabelButton = page.getByTestId("purchase-label-btn");
    this.estimatedDeliveryText = page.getByText("estimated delivery date");
    this.priceText = page.getByText("$");
    this.trackingCodeLink = page.getByTestId("tracking-code-link");
    this.shipAgainButton = page.getByTestId("ship-order-btn-again");

    // Common
    this.backArrowButton = page.getByTestId("ship-transfer-orders-back-btn");
  }

  // --------- MANUAL TRACKING FLOW ---------
  async openManualTrackingTab() {
    await expect(this.manualTrackingTab).toBeVisible();
    await this.manualTrackingTab.click();
  }

  async fillManualTrackingDetails(carrier = null, trackingNumber = "1234567890", method = null) {
    // Select carrier
    await expect(this.carrierDropdown).toBeVisible();
    await this.carrierDropdown.click();
    await this.carrierOption.click();

    // Enter tracking number
    await expect(this.trackingInput).toBeVisible();
    await this.trackingInput.fill(trackingNumber);

    // Select method
    await expect(this.methodDropdown).toBeVisible();
    await this.methodDropdown.click();
    await this.methodOption.click();

    // Verify tracking link
    await expect(this.trackingTestLink).toBeVisible();
  }

  async clickTrackingTestLink() {
    await this.trackingTestLink.click();
    await expect(this.page).toHaveURL(/.*tracking/);
  }

  async shipOrder() {
    await expect(this.shipOrderButton).toBeVisible();
    await this.shipOrderButton.click();
  }

  // --------- PURCHASE SHIPPING LABEL FLOW ---------
  async openPurchaseLabelTab() {
    await expect(this.purchaseLabelTab).toBeVisible();
    await this.purchaseLabelTab.click();
  }

  async clickPurchaseLabelButton() {
    await expect(this.purchaseLabelButton).toBeVisible();
    await this.purchaseLabelButton.click();
  }

  async verifyPurchaseLabelDetails() {
    await expect(this.estimatedDeliveryText).toBeVisible();
    await expect(this.priceText).toBeVisible();
    await expect(this.trackingCodeLink).toBeVisible();
  }

  async clickTrackingCodeLink() {
    await this.trackingCodeLink.click();
    await expect(this.page).toHaveURL(/.*tracking/);
  }

  async shipOrderAgain() {
    await expect(this.shipAgainButton).toBeVisible();
    await this.shipAgainButton.click();
  }
}
