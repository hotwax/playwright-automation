// createTransferOrderPage.js
// Page Object Model for the "Create Transfer Order" modal
import { expect } from "@playwright/test";
class CreateTransferOrderPage {
  constructor(page) {
    this.page = page;
    this.closeButton = page.getByTestId("create-transfer-order-close-modal");
    this.transferOrderLink = page.getByText('Transfer Orders').click();
    this.heading = page.getByText("Create Transfer Order");
    this.transferNameInput = page.getByTestId("transfer-name-input");
    this.facilitySearchInput = page.getByTestId("facility-search-input");
    this.facilityRadioOptions = page.getByTestId("facility-radio-options");
    this.noResultsMessage = page.getByText(/No results found/i);
    this.saveTransferOrderButton = page.getByTestId("save-transfer-order-btn");
    this.createTransferOrderButton = page.getByTestId(
      "create-transfer-order-btn",
    );
  }

async clickOnTransferOrderLink(){
  await this.transferOrderLink.click();
}

  async verifyCreateTransferOrderButton() {
    await expect(this.createTransferOrderButton).toBeVisible();
  }

  async clickCreateTransferOrderButton() {
    await this.createTransferOrderButton.click();
  }

  async verifyModalIsVisible() {
    await expect(this.heading).toBeVisible();
    await expect(this.transferNameInput).toBeVisible();
  }

  async closeModal() {
    await this.closeButton.click();
  }

  async enterTransferName(name) {
    await this.transferNameInput.fill(name);
  }

  // Search for a facility and trigger results with Enter
  async searchFacility(facilityName) {
    await this.facilitySearchInput.fill(facilityName);
    await this.facilitySearchInput.press("Enter"); // simulate hitting Enter
    // Optional: wait for results or “No results” message to appear
    await this.page.waitForTimeout(1000);
  }

  async selectFirstFacility() {
    const first = this.facilityRadioOptions.first();
    await expect(first).toBeVisible();
    await first.click();
    await expect(first).toBeChecked();
  }

  async verifyNoResultsMessage() {
    await expect(this.noResultsMessage).toBeVisible();
  }

  async clickSave() {
    await expect(this.saveTransferOrderButton).toBeVisible();
    await this.saveTransferOrderButton.click();
  }
}
export default CreateTransferOrderPage;
