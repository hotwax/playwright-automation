import { test, expect } from "@playwright/test";

test("Edit Transfer Order name and store", async ({ page }) => {
  await page.goto(
    "https://fulfillment-dev.hotwax.io/transfer-orders/<ORDER_ID>",
  );

  const orderEditBtn = page.getByTestId("order-name-edit-btn");
  await expect(orderEditBtn).toBeVisible();
  await orderEditBtn.click();

  const editedOrderNameInput = page.getByTestId("edited-order-name-input");
  await editedOrderNameInput.fill("Updated Playwright TO 001");
  await page.getByTestId("save-ediited-transfer-order-name-btn").click();

  await expect(page.getByTestId("edited-order-name-input")).not.toBeVisible();
  await expect(page.getByText("Updated Playwright TO 001")).toBeVisible();

  const storeEditBtn = page.getByTestId("store-name-edit-btn");
  await expect(storeEditBtn).toBeVisible();
  await storeEditBtn.click();

  await expect(page.getByText("Select facility || Select Store")).toBeVisible();

  const firstFacility = page.getByTestId("facility-radio-option").first();
  await expect(firstFacility).toBeVisible();
  await firstFacility.click();
  await expect(firstFacility).toBeChecked();

  const saveBtn = page.getByTestId("update-store-name-transfer-order-btn");
  await expect(saveBtn).toBeVisible();
  await saveBtn.click();

  await expect(page.getByText("Updated Store Name")).toBeVisible();
});
