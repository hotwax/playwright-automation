export class TransferOrderDetailsAndAddItemsPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.orderEditBtn = page.getByTestId('order-name-edit-btn');
    this.orderNameInput = page.getByTestId('edited-order-name-input');
    this.saveOrderNameBtn = page.getByTestId('save-ediited-transfer-order-name-btn');

    this.storeEditBtn = page.getByTestId('store-name-edit-btn');
    this.firstFacility = page.getByTestId('facility-radio-option').first();
    this.saveStoreBtn = page.getByTestId('update-store-name-transfer-order-btn');
  
}
// Navigate to a specific transfer order by ID
 async goto(orderId) {
    await this.page.goto(`https://fulfillment-dev.hotwax.io/transfer-orders/${orderId}`);
  }
  // Edit the order name
  async editOrderName(newName) {
    await expect(this.orderEditBtn).toBeVisible();
    await this.orderEditBtn.click();

    await expect(this.orderNameInput).toBeVisible();
    await this.orderNameInput.fill(newName);
    await this.saveOrderNameBtn.click();

    await expect(this.orderNameInput).not.toBeVisible();
    await expect(this.page.getByText(newName)).toBeVisible();
  }
 // Edit the store/facility
  async editStore(expectedStoreName = 'Updated Store Name') {
    await expect(this.storeEditBtn).toBeVisible();
    await this.storeEditBtn.click();

    await expect(this.page.getByText(/Select facility|Select Store/)).toBeVisible();

    await expect(this.firstFacility).toBeVisible();
    await this.firstFacility.click();
    await expect(this.firstFacility).toBeChecked();

    await expect(this.saveStoreBtn).toBeVisible();
    await this.saveStoreBtn.click();

    await expect(this.page.getByText(expectedStoreNameStoreName)).toBeVisible();
  }
}
