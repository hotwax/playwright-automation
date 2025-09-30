import { expect } from '@playwright/test';

export class TransferOrderDetailsPage {
  constructor(page) {
    this.page = page;

    // locators
    this.searchInput = page.getByTestId('search-product-input');
    this.addToTransferBtn = page.getByTestId('Add-to-transfer-btn').first();
    this.itemQtyInput = page.getByTestId('qty-input').nth(0);
    this.bookQOHBtn = page.getByTestId('book-qoh-btn').nth(0);
    this.removeItemBtn = page.getByTestId('remove-item-btn').nth(0);
    
  }

  async goto(orderId) {
    await this.page.goto(`https://fulfillment-dev.hotwax.io/transfer-orders/${orderId}`);
  }

  // verify item can be searched and added to transfer order
  async searchAndAddItem(productCode) {
    await expect(this.searchInput).toBeVisible();
    await this.searchInput.fill(productCode);
    await this.searchInput.press('Enter');
    await expect(this.page.getByText(productCode)).toBeVisible();

    await expect(this.addToTransferBtn).toBeVisible();
    await this.addToTransferBtn.click();

    await expect(this.itemQtyInput).toBeVisible();
  }
  // set a custom qty for the item.
  async setCustomQty(qty) {
    await this.itemQtyInput.fill(qty.toString());
    await expect(this.itemQtyInput).toHaveValue(qty.toString());
  }

  async bookQOH() {
    await expect(this.bookQOHBtn).toBeVisible();
    await this.bookQOHBtn.click();

    const qohValue = await this.itemQtyInput.inputValue();
    return qohValue; // new system-assigned qty
  }

  async removeItem(productCode) {
    await expect(this.removeItemBtn).toBeVisible();
    await this.removeItemBtn.click();

    // verify item is gone from list
    await expect(this.page.getByText(productCode)).not.toBeVisible();
  }
}