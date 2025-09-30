
export class TransferOrderDetailsAndAddItemsPage {
  constructor(page) {
    this.page = page;

    // Locators
    
    this.barcodeInput = page.getByTestId('barcode-input');
    this.searchInput = page.getByTestId('search-products-input');

    this.addToTransferBtn = page.getByTestId('Add-to-transfer-btn').first();
    this.itemQtyInput = page.getByTestId('qty-input').first();

    this.discardBtn = page.getByTestId('discard-order-btn');
    this.shipLaterDisabled = page.getByTestId('ship-later-btn');
    this.packShipDisabled = page.getByTestId('pack-and-ship-btn');
    this.viewMoreAndSearch =page.getByTestId('view-more-results');
    this.viewmorecloseModalBtn = page.getByTestId('viewmore-close-modal');
    this.AddtoTransferbuttonviewmore = page.getByTestId('viewmore-Add-to-transfer-btn').nth();
    this.viewMoreSearchinput = page.getByTestId('viewmore-search-products-input');
    this.vewmorelink =page.getByTestId('view-more-results');

  }
  // Navigate to a specific transfer order by ID
 async goto(orderId) {
    await this.page.goto(`https://fulfillment-dev.hotwax.io/transfer-orders/${orderId}`);
  }

 // Verify footer buttons are disabled as item list is empty
  async verifyFooterButtonsDisabled() {
    await expect(this.discardBtn).toBeVisible();
    await expect(this.shipLaterDisabled).toBedisable();
    await expect(this.packShipDisabled).toBedisable();
  }

  async addItem(productCode, qty) {
    // try barcode input for add item. If not visible, use search input.
    if (await this.barcodeInput.isVisible()) {
      await this.barcodeInput.fill(productCode);
      await this.barcodeInput.press('Enter');
    } else if (await this.searchInput.isVisible()) {
      await this.searchInput.fill(productCode);
      await this.searchInput.press('Enter');
    }
    //verify product appears and  on click on add to transfer button it added to the list with 1 qty
    await expect(this.page.getByText(productCode)).toBeVisible();
    await expect(this.addToTransferBtn).toBeVisible();
    await this.addToTransferBtn.click();

    await expect(this.itemQtyInput).toBeVisible();
    //verify default qty is 1.
    await expect(this.itemQtyInput).toHaveValue('1');
  }

 //verify invalid scan shows no results found
  async verifyInvalidScan(invalidCode) {
    await this.barcodeInput.fill(invalidCode);
    await this.barcodeInput.press('Enter');
    await expect(this.page.getByText(/No results found/i)).toBeVisible();
  }

  //verify invalid search shows no results found.
    async verifyInvalidSearch(invalidTerm) {
    await this.searchInput.fill(invalidTerm);
    await this.searchInput.press('Enter');
    await expect(this.page.getByText(/No results found/i)).toBeVisible();
    }

    //Verify that on clicking on view more link to see more products 
   async viewMoreAndSearch(productCode) {
    const viewMoreLink = this.page.getByTestId('view-more-results');
    await expect(viewMoreLink).toBeVisible();
    await viewMoreLink.click();

    // verify modal open with heading 'Add a Product'

    await expect(this.page.getByText('Add a Product')).toBeVisible();
    await this.searchInput.fill(productCode);
    await this.searchInput.press('Enter');
    await expect(this.page.getByText(productCode)).toBeVisible();
    // verify that can click button "Add to transfer"
    await expect(this.addToTransferBtn).toBeVisible();
    await this.addToTransferBtn.click();
    // verify that item is added to the list with 1 qty by default.
    await expect(this.itemQtyInput).toBeVisible();
    await expect(this.itemQtyInput).toHaveValue('1');
    // verify if modal is closed on clicking X button
    const closeModalBtn = this.page.getByTestId('close-add-product-modal');
    await expect(closeModalBtn).toBeVisible();
    await closeModalBtn.click();
    await expect(this.page.getByText('Add a Product')).not.toBeVisible();
  }

    // verify that iteam is serached but clicked on cross butoon to closed the modal without hittin button "Add to transfer"
  async closeModalWithoutAdding(productCode) {
    const viewMoreLink = this.page.getByTestId('view-more-results');
    await expect(viewMoreLink).toBeVisible();
    await viewMoreLink.click();

    // verify modal open with heading 'Add a Product'

    await expect(this.page.getByText('Add a Product')).toBeVisible();
    await this.searchInput.fill(productCode);
    await this.searchInput.press('Enter');

    //verify click on crooss and close the maodal
    const viewmorecloseModalBtn = this.page.getByTestId('viewmore-close-modal');
    await expect(viewmorecloseModalBtn).toBeVisible().click();
    await expect(this.page.getByText('Add a Product')).not.toBeVisible();
    // verify that item is not added to the list
    await expect(this.page.getByText(productCode)).not.toBeVisible();
}
  
  async discardOrder() {
    await this.discardBtn.click();
  }
} 
module.exports = { TransferOrderDetailsAndAddItemsPage };