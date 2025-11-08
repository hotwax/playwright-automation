// pages/shippingPage.js
import { expect } from "@playwright/test";

export class ShippingPage {
  constructor(page) {
    this.page = page;
    // Tabs by text
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
  }

  async clickAndExpectVisible(element) {
    await expect(element).toBeVisible();
    await element.click();
  }

  // --------- MANUAL TRACKING FLOW ---------
  async manualTrackingFlow(carrier = null, trackingNumber = "1234567890", method = null) {
    await this.clickAndExpectVisible(this.manualTrackingTab);
    await this.clickAndExpectVisible(this.carrierDropdown);
    await this.carrierOption.click();
    await this.trackingInput.fill(trackingNumber);
    await this.clickAndExpectVisible(this.methodDropdown);
    await this.methodOption.click();
    await this.clickAndExpectVisible(this.trackingTestLink);
    await expect(this.page).toHaveURL(/.*tracking/);
    await this.clickAndExpectVisible(this.shipOrderButton);
  }

  // --------- PURCHASE SHIPPING LABEL FLOW ---------
  async purchaseLabelFlow() {
    await this.clickAndExpectVisible(this.purchaseLabelTab);
    await this.clickAndExpectVisible(this.purchaseLabelButton);
    await expect(this.estimatedDeliveryText).toBeVisible();
    await expect(this.priceText).toBeVisible();
    await this.clickAndExpectVisible(this.trackingCodeLink);
    await expect(this.page).toHaveURL(/.*tracking/);
    await this.clickAndExpectVisible(this.shipAgainButton);
  }
}
