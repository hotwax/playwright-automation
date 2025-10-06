// pages/addTransferOrderPage.js
const { expect } = require("@playwright/test");

class AddTransferOrderPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Main Page Locators

    this.searchInput = page.getByTestId("search-products-input"); // Search input on main page
    this.getAddToTransferBtn = (productCode) =>
      page
        .getByTestId("Add-to-transfer-btn")
        .locator("text=" + productCode)
        .first(); // Add button for a specific product

    // View More Modal Locators

    this.viewMoreLink = page.getByTestId("view-more-results"); // Link to open "View More" modal
    this.viewMoreSearchInput = page.getByTestId(
      "viewmore-search-products-input",
    ); // Search input inside modal
    this.getViewMoreAddBtn = (productCode) =>
      page
        .getByTestId("viewmore-Add-to-transfer-btn")
        .locator("text=" + productCode)
        .first(); // Add button in modal
    this.viewMoreCloseModalBtn = page.getByTestId("viewmore-close-modal"); // Close modal button
  }
  // Navigate to a specific Transfer Order

  async goto(orderId) {
    await this.page.goto(
      `https://fulfillment-dev.hotwax.io/transfer-orders/${orderId}`,
    );
  }

  // Search and add a product on the main page

  async searchAndAddProduct(productCode) {
    // Type the product name in the search input
    await this.searchInput.fill(productCode);

    // Press Enter to trigger search results
    await this.searchInput.press("Enter");

    // Wait for the product to appear in search results
    await expect(this.page.getByText(productCode)).toBeVisible();

    // Click the "Add to Transfer" button for the product
    const addBtn = this.getAddToTransferBtn(productCode);
    await expect(addBtn).toBeVisible();
    await addBtn.click();
  }
  // Open "View More" modal, search, and add a product

  async viewMoreAndAddProduct(productCode) {
    // Open the "View More" modal
    await expect(this.viewMoreLink).toBeVisible();
    await this.viewMoreLink.click();

    // Verify the modal opened
    await expect(this.page.getByText("Add a Product")).toBeVisible();

    // Search for product in modal and press Enter
    await this.viewMoreSearchInput.fill(productCode);
    await this.viewMoreSearchInput.press("Enter");

    // Wait for product to appear in modal search results
    await expect(this.page.getByText(productCode)).toBeVisible();

    // Click the "Add to Transfer" button inside modal
    const addBtn = this.getViewMoreAddBtn(productCode);
    await expect(addBtn).toBeVisible();
    await addBtn.click();

    // Close the modal after adding product
    await expect(this.viewMoreCloseModalBtn).toBeVisible();
    await this.viewMoreCloseModalBtn.click();

    // Verify modal is closed
    await expect(this.page.getByText("Add a Product")).not.toBeVisible();
  }
  // Verify search with an invalid product shows "No results found"

  async verifyInvalidSearch(invalidTerm) {
    await this.searchInput.fill(invalidTerm);
    await this.searchInput.press("Enter");
    await expect(this.page.getByText(/No results found/i)).toBeVisible();
  }
}

module.exports = { AddTransferOrderPage };
