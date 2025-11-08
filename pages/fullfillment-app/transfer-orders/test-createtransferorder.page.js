export default class TestTransferOrderPage {
    constructor(page) {
        this.page = page
        this.creat
    }

    async createTransferOrder(orderName, facilityName){
        await this.page.waitForTimeout(5000);
        await this.page.goto('https://fulfillment-dev.hotwax.io/open');
        await this.page.getByText ('Transfer Orders').click();
 await this.page.waitForTimeout(5000);
 // await this.page.getByTestId('create-transfer-order-btn').getByRole('button').click();
 
  await this.page.getByRole('textbox', { name: 'Transfer name' }).click();
  await this.page.getByRole('textbox', { name: 'Transfer name' }).fill(orderName);
  await this.page.getByRole('searchbox', { name: 'search text' }).click();
  await this.page.getByRole('searchbox', { name: 'search text' }).fill(facilityName);
  await this.page.getByTestId('facility-radio-options').click();
  await this.page.getByTestId('save-transfer-order-btn').click()
  
  //.getByRole('img').nth(1).click();
 await this.page.waitForTimeout(5000);

    }
}