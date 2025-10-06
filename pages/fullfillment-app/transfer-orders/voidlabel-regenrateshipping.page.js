// pages/transferOrderPage.js
import { expect } from "@playwright/test";

export class TransferOrderPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Void Label selectors
    this.voidLabelButton = page.getByTestId("void-label-btn");
    this.voidModalHeading = page.getByText("Void shipping label");
    this.voidConfirmButton = page.getByTestId("voidlabel-confirm-btn");
    this.voidCancelButton = page.getByTestId("voidlabel-cancel-btn");

    // Regenerate Shipping Label selectors
    this.regenLabelButton = page.getByTestId("reprint-label-btn");
    this.shipOrderButton = page.getByTestId("ship-order-btn");
    this.trackingCodeLink = page.getByTestId("tracking-code-link");

    // Common page heading
    this.shipTransferOrderHeading = page.getByText("Ship transfer order");
  }

  // Navigate to Transfer Orders page
  async goto() {
    await this.page.goto(
      process.env.LOGIN_URL ||
        "https://fulfillment-dev.hotwax.io/transfer-orders",
    );
  }

  //  VOID LABEL FLOW
  async verifyVoidLabelButton() {
    await expect(this.voidLabelButton).toBeVisible();
  }

  async openVoidLabelModal() {
    await this.voidLabelButton.click();
    await expect(this.voidModalHeading).toBeVisible();
  }

  async confirmVoidLabel() {
    await expect(this.voidConfirmButton).toBeVisible();
    await this.voidConfirmButton.click();
    await expect(this.voidModalHeading).not.toBeVisible();
    await expect(this.shipTransferOrderHeading).toBeVisible();
  }

  async cancelVoidLabel() {
    await expect(this.voidCancelButton).toBeVisible();
    await this.voidCancelButton.click();
    await expect(this.voidModalHeading).not.toBeVisible();
  }

  // --------- REGENERATE SHIPPING LABEL FLOW ---------
  async verifyRegenLabelButton() {
    await expect(this.regenLabelButton).toBeVisible();
  }

  async clickRegenLabel() {
    await this.regenLabelButton.click();
  }

  async verifyShipOrderAgainButton() {
    await expect(this.shipOrderButton).toBeVisible();
  }

  async clickShipOrderAgain() {
    await this.shipOrderButton.click();
  }

  async verifyTrackingCodeLink() {
    await expect(this.trackingCodeLink).toBeVisible();
  }
}
