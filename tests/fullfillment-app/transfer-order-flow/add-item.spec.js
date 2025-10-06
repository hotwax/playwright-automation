import { test, expect } from "@playwright/test";
import CreateTransferOrderPage from "../../pages/fullfillment-app/transfer-orders/create-order.page.js";

test("Transfer Order - Search and add multiple products", async ({ page }) => {
  const TOPage = new AddTransferOrderPage(page);

  // --------------------
  // Step 1: Go to a specific transfer order page
  // --------------------
  const orderId = "12345"; // Replace with a real order ID
  await TOPage.goto(orderId);

  // --------------------
  // Step 2: Search and add products on main page
  // --------------------
  await TOPage.searchAndAddProduct("MH01-XS-Orange"); // Product 1
  await TOPage.searchAndAddProduct("MH01-S-Red"); // Product 2

  // --------------------
  // Step 3: Search and add products using View More modal
  // --------------------
  await TOPage.viewMoreAndAddProduct("MH01-XS-Blue"); // Product 3
  await TOPage.viewMoreAndAddProduct("MH01-M-Green"); // Product 4

  // --------------------
  // Step 4: Verify all added products appear in the transfer order
  // --------------------
  const addedProducts = [
    "MH01-XS-Orange",
    "MH01-S-Red",
    "MH01-XS-Blue",
    "MH01-M-Green",
  ];

  for (const productCode of addedProducts) {
    await expect(page.getByText(productCode)).toBeVisible();
  }
});
