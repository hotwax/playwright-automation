// createTransferOrderPage.js
// Page Object Model for the "Create Transfer Order" modal

const { expect } = require('@playwright/test');

class CreateTransferOrderPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Locators for modal elements
    this.closeButton = page.getByTestId('create-transfer-order-close-modal'); // X button
    this.heading = page.getByText('Create Transfer Order'); // Heading text
    this.transferNameInput = page.getByTestId('transfer-name-input'); // Transfer name input
    this.facilitySearchInput = page.getByTestId('facility-search-input'); // Facility search field
    this.facilityRadioOptions = page.getByTestId('facility-radio-options'); // Facility radio list
    this.noResultsMessage = page.getByText(/No results found/i); // No results message
    this.saveButton = page.getByTestId('save-transfer-order-btn'); // Floating Save button
  }

  // Verify modal is visible
  async verifyModalIsVisible() {
    await expect(this.heading).toBeVisible();
    await expect(this.transferNameInput).toBeVisible();
  }

  // Close modal
  async closeModal() {
    await expect(this.closeButton).toBeVisible();
    await this.closeButton.click();
  }

  // Enter transfer name
  async enterTransferName(name) {
    await this.transferNameInput.fill(name);
  }

  // Search for a facility
  async searchFacility(facilityName) {
    await this.facilitySearchInput.fill(facilityName);
    await this.facilitySearchInput.press('Enter');
  }

  // Select the first facility
  async selectFirstFacility() {
    await expect(this.facilityRadioOptions.first()).toBeVisible();
    await this.facilityRadioOptions.first().click();
    await expect(this.facilityRadioOptions.first()).toBeChecked();
  }

  // Verify "No results found" message
  async verifyNoResultsMessage() {
    await expect(this.noResultsMessage).toBeVisible();
  }

  // Save and create transfer order
  async clickSave() {
    await expect(this.saveButton).toBeVisible();
    await this.saveButton.click();
  }
}

module.exports = { CreateTransferOrderPage };
