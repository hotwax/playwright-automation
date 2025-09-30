//verify that void label button is present and functional
import { test, expect } from "@playwright/test";
test("should open the create transfer order modal", async ({ page }) => {
  // Go to Transfer Orders page directly inside the test
  await page.goto(
    process.env.LOGIN_URL ||
      "https://fulfillment-dev.hotwax.io/transfer-orders",
  );
  // verify that void label button is present and functional
  let voidLabelButton = page.getByTestId("void-label-btn");
  await expect(voidLabelButton).toBeVisible();
  await voidLabelButton.click();
  // Verify modal heading is Void Label.
  let modalHeading = page.getByText("Void shipping label");
  await expect(modalHeading).toBeVisible();
  // verify that confirm button is present and clickable
  let confirmButton = page.getByTestId("confirm-void-label-btn");
  await expect(confirmButton).toBeVisible();
  await confirmButton.click();
  // Verify that modal is closed after clicking confirm button
  await expect(page.getByText("Void shipping label")).not.toBeVisible();
  //verify that landing page is visible after closing modal (ship transfer order heading)
  await expect(page.getByText("Ship transfer order")).toBeVisible();
});
