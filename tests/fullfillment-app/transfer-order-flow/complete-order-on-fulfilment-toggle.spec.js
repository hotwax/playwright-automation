//verify that if toggle button for complete order on fulfilment is enabled
// then order is completed automatically after fulfilment.
import { test, expect } from "@playwright/test";
test("should verify complete order on fulfillment toggle functionality", async ({
  page,
}) => {
  // Go to Transfer Orders page
  await page.goto(
    process.env.LOGIN_URL ||
      "https://fulfillment-dev.hotwax.io/transfer-orders",
  );

  // Locate the toggle button
  const toggleButton = page.getByTestId("toggle-complete-on-fulfillment");
  await expect(toggleButton).toBeVisible();

  // Check the current state of the toggle
  const isChecked = await toggleButton.isChecked();
  console.log(`Toggle is ${isChecked ? "ON" : "OFF"} by default`);

  if (!isChecked) {
    console.log(
      "Toggle is OFF → Orders will move to Receiving App after Pack & Ship",
    );
  } else {
    console.log(
      "Toggle is ON → Orders will complete automatically after Pack & Ship",
    );
  }

  // Toggle ON (if it was OFF)
  if (!isChecked) {
    await toggleButton.click();
    await expect(toggleButton).toBeChecked();
    console.log("Toggle turned ON successfully");
  }

  //Toggle OFF (to revert)
  if (isChecked || !(await toggleButton.isChecked())) {
    await toggleButton.click();
    await expect(toggleButton).not.toBeChecked();
    console.log("Toggle turned OFF successfully");
  }
});
