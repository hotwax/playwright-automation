import { expect } from "@playwright/test";

export class TransferOrderDetailsPage {
  constructor(page) {
    this.page = page;

    // Data Test Ids 
    this.orderEditBtn = page.getByTestId("order-name-edit-btn");
    this.orderInput = page.getByTestId("edited-order-name-input");
    this.saveOrderBtn = page.getByTestId("save-edited-transfer-order-name-btn");
    this.cancelOrderBtn = page.getByTestId("cancel-editting-transfer-order-name-btn");

    this.storeEditBtn = page.getByTestId("store-name-edit-btn");
    this.facilityOptions = page.getByTestId("update-facility-radio-options");
    this.saveStoreBtn = page.getByTestId("update-store-name-transfer-order-btn");
    this.closeStoreModalBtn = page.getByTestId("update-store-name-close-modal-btn");
  }

  // Reusable methods
  async click(element) {
    await element.click();
  }

  async fill(element, value) {
    await element.fill(value);
  }

  async editOrderName(name) {
    await this.click(this.orderEditBtn);
    await this.fill(this.orderInput, name);
    await this.click(this.saveOrderBtn);
    await expect(this.page.getByText(name)).toBeVisible();
  }

  async cancelEditOrderName() {
    await this.click(this.orderEditBtn);
    await this.click(this.cancelOrderBtn);
    await expect(this.orderInput).not.toBeVisible();
  }

  async editStore(expectedStoreName = null) {
    await this.click(this.storeEditBtn);
    const firstOption = this.facilityOptions.first();
    await this.click(firstOption);
    await expect(firstOption).toBeChecked();
    await this.click(this.saveStoreBtn);
    if (expectedStoreName) {
      await expect(this.page.getByText(expectedStoreName)).toBeVisible();
    }
  }

  async closeStoreModal() {
    await this.click(this.closeStoreModalBtn);
    await expect(this.closeStoreModalBtn).not.toBeVisible();
  }
}
