// pages/TransferOrderDetailsPage.js
import { expect } from "@playwright/test";

export class TransferOrderDetailsPage {
  constructor(page) {
    this.page = page;

    // -------------------------
    // Edit order name
    // -------------------------
    this.orderEditBtn = page.getByTestId("order-name-edit-btn");
    this.editedOrderNameInput = page.getByTestId("edited-order-name-input");
    this.saveEditedOrderNameBtn = page.getByTestId(
      "save-edited-transfer-order-name-btn",
    );
    this.cancelEditedOrderNameBtn = page.getByTestId(
      "cancel-editting-transfer-order-name-btn",
    );

    // -------------------------
    // Edit store name modal
    // -------------------------
    this.storeEditBtn = page.getByTestId("store-name-edit-btn");
    this.updateFacilityRadioOptions = page.getByTestId(
      "update-facility-radio-options",
    );
    this.saveStoreBtn = page.getByTestId(
      "update-store-name-transfer-order-btn",
    );
    this.closeStoreModalBtn = page.getByTestId(
      "update-store-name-close-modal-btn",
    );
  }

  // Methods for Order Name
  async editOrderName(newName) {
    await expect(this.orderEditBtn).toBeVisible();
    await this.orderEditBtn.click();

    await expect(this.editedOrderNameInput).toBeVisible();
    await this.editedOrderNameInput.fill(newName);

    await expect(this.saveEditedOrderNameBtn).toBeVisible();
    await this.saveEditedOrderNameBtn.click();

    await expect(this.editedOrderNameInput).not.toBeVisible();
    await expect(this.page.getByText(newName)).toBeVisible();
  }

  async cancelEditOrderName() {
    await expect(this.orderEditBtn).toBeVisible();
    await this.orderEditBtn.click();

    await expect(this.cancelEditedOrderNameBtn).toBeVisible();
    await this.cancelEditedOrderNameBtn.click();

    await expect(this.editedOrderNameInput).not.toBeVisible();
  }
  // Methods for Store / Facility

  async openEditStoreModal() {
    await expect(this.storeEditBtn).toBeVisible();
    await this.storeEditBtn.click();
  }

  async selectFirstFacilityAndSave(expectedStoreName = null) {
    await expect(this.updateFacilityRadioOptions.first()).toBeVisible();
    await this.updateFacilityRadioOptions.first().click();
    await expect(this.updateFacilityRadioOptions.first()).toBeChecked();

    await expect(this.saveStoreBtn).toBeVisible();
    await this.saveStoreBtn.click();

    if (expectedStoreName) {
      await expect(this.page.getByText(expectedStoreName)).toBeVisible();
    }
  }

  async closeStoreModal() {
    await expect(this.closeStoreModalBtn).toBeVisible();
    await this.closeStoreModalBtn.click();
    await expect(this.closeStoreModalBtn).not.toBeVisible();
  }
}
