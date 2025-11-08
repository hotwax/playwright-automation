import { expect } from "@playwright/test";

export class TransferOrderQtyPage {
  constructor(page) {
    this.page = page;

    // locators related to quantity
    this.qtyInput = page.getByTestId("qty-input").first();
    this.bookQOHBtn = page.getByTestId("book-qoh-btn").first();
    this.removeItemBtn = page.getByTestId("remove-item-btn").first();
  }

  // Set a custom quantity for the item
  async setCustomQty(qty) {
    await this.qtyInput.fill(qty.toString());
    return this.qtyInput; // return element for assertion in test
  }

 //Click Book QOH and return the new system-assigned quantity
  
  async bookQOH() {
    await this.bookQOHBtn.click();
    const qohValue = await this.qtyInput.inputValue();
    return qohValue;
  }
   //Remove the item from the order

  async removeItem() {
    await this.removeItemBtn.click();
  }
}

  