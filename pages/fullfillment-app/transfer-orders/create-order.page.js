//createTransferOrderPage.js
//This is the Page Object Model for Create Transfer Order modal

const { expect } = require('@playwright/test');

class EditTransferOrederDetailsAndAddItemsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Locators for the modal elements
    this.closeButton = page.getByTestId('create-to-close-modal'); // X button to close modal
    this.heading = page.locator('text=Create transfer order');   // Heading text
    this.transferNameInput = page.getByTestId('transfer-name-input'); // Transfer name input field
    this.facilitySearchInput = page.getByTestId('facility-search-input'); // Facility search field
    this.facilityRadioOptions = page.getByTestId('facility-radio-options'); // Facility radio buttons
    this.createTOButton = page.getByTestId('create-transfer-order-btn'); // Floating action button
  }

  // Method to verify modal is visible
  async verifyModalIsVisible() {
    await expect(this.heading).toBeVisible(); // Check heading is visible
    await expect(this.transferNameInput).toBeVisible(); // Check input field is visible
  }

  // Method to close the modal
  async closeModal() {
    await this.closeButton.click();
  }

  // Method to enter transfer name
  async enterTransferName(name) {
    await this.transferNameInput.fill(name); // Fill input with provided name
  }

  // Method to search facility
  async searchFacility(facilityName) {
    await this.facilitySearchInput.fill(facilityName); // Fill search field
    // Optional: you can wait for results to appear or "No results found"
    await this.page.waitForTimeout(500); // Wait briefly for results to appear
  }

  // Method to select first available facility
  async selectFirstFacility() {
    await this.facilityRadioOptions.first().click(); // Select the first facility from list
  }

  // Method to click Create Transfer Order button
  async clickCreateTO() {
    await this.createTOButton.click(); // Click on the blue button
  }
}
module.exports = { EditTransferOrederDetailsAndAddItemsPage };