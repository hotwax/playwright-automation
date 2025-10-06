// tests/create-transfer-order.spec.js
import { test, expect } from "@playwright/test";
import { CreateTransferOrderPage } from "../pages/createTransferOrderPage";

test.describe("Create Transfer Order Modal Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Go to Transfer Orders page
    await page.goto(
      process.env.LOGIN_URL ||
        "https://fulfillment-dev.hotwax.io/transfer-orders",
    );
  });

  test("should open the Create Transfer Order modal and create an order", async ({
    page,
  }) => {
    const createTO = new CreateTransferOrderPage(page);

    // Verify create transfer order button is visible and open modal
    await createTO.verifyCreateTransferOrderButton();
    await createTO.clickCreateTransferOrderButton();

    // Verify modal elements
    await createTO.verifyModalIsVisible();

    // Enter transfer name
    await createTO.enterTransferName("Playwright TO 001");

    // Search and select facility
    await createTO.searchFacility("Central Warehouse");
    await createTO.facilitySearchInput.press("Enter");
    await createTO.selectFirstFacility();
    // Optionally verify selection
    const selectedFacility = createTO.facilityRadioOptions.first();
    await expect(selectedFacility).toBeChecked();

    // Save and verify modal closed
    await createTO
      .saveTransferOrderButton("save-transfer-order-btn")
      .toBeVisible();
    await createTO.clickSave();
    await expect(page.getByText("Create Transfer Order")).not.toBeVisible();
  });

  // Close modal test.
  test("should close the modal when X button is clicked", async ({ page }) => {
    const createTO = new CreateTransferOrderPage(page);

    await createTO.clickCreateTransferOrderButton();
    await createTO.verifyModalIsVisible();

    await createTO.closeModal();

    // Verify modal is closed
    await expect(page.getByText("Create Transfer Order")).not.toBeVisible();
  });

  test("should show 'No results found' for invalid facility search", async ({
    page,
  }) => {
    const createTO = new CreateTransferOrderPage(page);

    await createTO.clickCreateTransferOrderButton();
    await createTO.verifyModalIsVisible();

    // Search with invalid name
    await createTO.searchFacility("InvalidFacilityXYZ");
    await createTO.verifyNoResultsMessage();
  });

  test("should validate empty transfer name cannot be saved", async ({
    page,
  }) => {
    const createTO = new CreateTransferOrderPage(page);

    await createTO.clickCreateTransferOrderButton();
    await createTO.verifyModalIsVisible();

    // Try saving without entering name
    await createTO.clickSave();

    // Verify some validation or disabled save
    const validationError = page.getByText(/transfer name/i);
    await expect(validationError).toBeVisible();
  });
});
