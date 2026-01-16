import { test, expect } from "@playwright/test";

test("Sanity | Transfer App | Create receiving-only transfer order and approve", async ({
  page,
}) => {
  // Step 1: Open Create Transfer Order page (logged-in)
  await page.goto("https://transfers-dev.hotwax.io/create-order");

  // Assertion: Page loaded
  await expect(page.getByText("Create transfer order")).toBeVisible();

  // Step 2: Enter Transfer name
  const transferNameInput = page.getByRole("textbox", {
    name: "Transfer name",
  });
  await transferNameInput.fill("transfer order R1");

  // Step 3: Select Product Store
  await page.getByText("Product Store").locator("svg").click();
  await page.getByRole("radio", { name: "Demo Store" }).click();

  // Step 4: Assign Origin
  await page
    .getByText("Origin")
    .getByRole("button", { name: "Assign" })
    .click();
  await page.getByRole("searchbox").fill("central");
  await page.getByRole("radio", { name: "Central Warehouse" }).click();
  await page.getByRole("button", { name: "Assign" }).click();

  // Step 5: Assign Destination
  await page
    .getByText("Destination")
    .getByRole("button", { name: "Assign" })
    .click();
  await page.getByRole("searchbox").fill("A221");
  await page.getByRole("radio", { name: /A221/i }).click();
  await page.getByRole("button", { name: "Assign" }).click();

  // Step 6: Select Lifecycle (Receiving only)
  await page.getByText("Lifecycle").locator("svg").click();
  await page.getByRole("radio", { name: "Receive only" }).click();

  // Step 7: Select Ship Date
  await page
    .getByText("Ship Date")
    .getByRole("button", { name: "Select date" })
    .click();
  await page.getByRole("button", { name: /Today/i }).click();
  await page.getByRole("button", { name: "Done" }).click();

  // Step 8: Search & add product
  const addProductInput = page.getByRole("textbox", { name: "Add product" });
  await addProductInput.fill("MH09");

  await page
    .getByText("Search result MH09-XS-Blue")
    .getByRole("button")
    .click();

  // Step 9: Enter Quantity
  const qtyInput = page.getByRole("spinbutton", { name: /Qty/i });
  await qtyInput.fill("12");

  // Step 10: Save / Create Transfer Order
  const saveBtn = page.getByRole("main").locator("ion-fab-button").first();

  await expect(saveBtn).toBeEnabled();
  await saveBtn.click();

  // Step 11: Approve Transfer Order
  const statusDropdown = page.getByText("Approve");
  await expect(statusDropdown).toBeVisible();
  await statusDropdown.click();

  await page.getByRole("radio", { name: "Approve" }).click();

  // Assertion: Order approved
  await expect(page.getByText("Approved")).toBeVisible();
});
