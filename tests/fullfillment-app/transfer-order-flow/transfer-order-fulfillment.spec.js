import { test, expect } from "@playwright/test";

test("should open the create transfer order modal", async ({ page }) => {
  // Go to Transfer Orders page directly inside the test
  await page.goto(
    process.env.LOGIN_URL ||
      "https://fulfillment-dev.hotwax.io/transfer-orders",
  );

  // finding a create Trabsfer order button to open moda, Locate + button and click
  let createButton = page.getByTestId("create-transfer-order-btn");
  await expect(createButton).toBeVisible();
  await createButton.click();

  // Verify modal heading is create Tranfer order.
  let modalHeading = page.getByText("Create transfer order");
  await expect(modalHeading).toBeVisible();

  // Verify by enter transfer name
  let transferNameInput = page.getByTestId("transfer-name-input");
  await transferNameInput.fill("Playwright TO 001");

  //verify search is working or not
  let serachInput = page.getByTestId("facility-search-input");
  await serachInput.fill("Central Warehouse");
  await searchInput.press("Enter"); //hitting Enter key

  // verify by selecting first facility option
  let firstOption = page.getByTestId("facility-radio-options").first();
  await firstOption.click();

  // Verify that modal closed after sucessfull creation of order (heading no longer visible)
  await expect(page.getByText("Create transfer order")).not.toBeVisible();
  // verify that back button is visible
  await expect(
    page.getByTestId("create-transfer-orders-back-btn"),
  ).toBeVisible();
  // verify order name editbutton is visible and clicked
  let editBtn = page.getByTestId('[data-testid="order-name-edit-btn"]');
  await expect(editBtn).toBeVisible();
  await editBtn.click();

  // verify that edit order name button is diaplyed and clickable.
  const orderEditBtn = page.getByTestId("order-name-edit-btn");
  await expect(orderEditBtn).toBeVisible();
  await orderEditBtn.click();

  const editedOrderNameInput = page.getByTestId("edited-order-name-input");
  await editedOrderNameInput.fill("Updated Playwright TO 001");
  await page.getByTestId("save-ediited-transfer-order-name-btn").click();

  // verify that pop-up is closed after saving the updated name.
  await expect(page.getByTestId("edited-order-name-input")).not.toBeVisible();

  // verify that the updated name is visible on the page
  await expect(page.getByText("Updated Playwright TO 001")).toBeVisible();

  // verify that the edit button is displayed and can click on the button.
  const storeEditBtn = page.getByTestId("store-name-edit-btn");
  await expect(storeEditBtn).toBeVisible();
  await storeEditBtn.click();

  //modal is open and now can edit the store name by slecting a radio button
  await expect(page.getByText("Select facility || Select Store")).toBeVisible();

  //verify that select first facility radio option
  let firstFacility = page.getByTestId("facility-radio-option").first();
  await expect(firstFacility).toBeVisible();
  await firstFacility.click();

  //verify radio got selected (checked)
  await expect(firstFacility).toBeChecked();

  // verify that first radio option is selected and can click on save button to save the updated store name.
  await expect(
    page.getByTestId("update-store-name-transfer-order-btn"),
  ).toBeVisible();
  await page.getByTestId("update-store-name-transfer-order-btn").click();

  // check the updated store name
  await page.getByTestId("update-store-name-transfer-order-btn").click();
  await expect(page.getByText("Updated Store Name")).toBeVisible();

  //verify that search input is visible and can type in it.
  serachInput = page.getByTestId('data-testid="search-product-input');
  await expect(serachInput).toBeVisible();
  await serachInput.fill("MH01-XS-Orange"); // product name
  await searchInput.press("Enter"); // hitting Enter key
  //verify taht product is visible in the serach result.
  await expect(page.getByText("MH01-XS-Orange")).toBeVisible();

  //verify that can can add a item to the Transfer order by clcicking on Add to transfer button.
  let addtotransferbtn = page.getByTestId("Add-to-transfer-btn").first();
  await expect(addtotransferbtn).toBeVisible();
  await addtotransferbtn.click();

  //verify that item is added to the order list and can update the quantity of the item.
  let itemQtyInput = page.getByTestId("qty-input").first();
  await expect(itemQtyInput).toBeVisible();
  await itemQtyInput.fill("101");
  await expect(itemQtyInput).toHaveValue("101");
});

//Verify the loagic of qty input Field (coustom Qty and Book QOH qty) by adding one more item in Tranfer order list.
test("Add one more item and verify the logic of Qty input field", async ({
  page,
}) => {
  // navigate directly to an order page
  await page.goto(
    "https://fulfillment-uat.hotwax.io/transfer-orders/<ORDER_ID>",
  );

  let serachInput = page.getByTestId("search-product-input");
  await expect(serachInput).toBeVisible();
  await serachInput.fill("MH02XSBlackHC"); // product name
  //verify that product is visible in the serach result.
  await searchInput.press("Enter"); //hitting Enter key
  await expect(page.getByText("MH02XSBlackHC")).toBeVisible();

  //verify that can can add a item to the Transfer order by clcicking on Add to transfer button.
  let addtotransferbtn = page.getByTestId("Add-to-transfer-btn").first();
  await expect(addtotransferbtn).toBeVisible();
  await addtotransferbtn.click();
  //verify that item is added to the order list and can update the quantity of the item.
  let itemQtyInput = page.getByTestId("qty-input").second();
  await expect(itemQtyInput).toBeVisible();
  await itemQtyInput.fill("10");
  await expect(itemQtyInput).toHaveValue("10");

  //verify the logic of Qty input field (coustom Qty and Book QOH qty)
  const qohBtn = page.getByTestId("book-qoh-btn").second();
  await qohBtn.click();
  const qohValue = await itemQtyInput.inputValue();
  expect(Number(qohValue)).toBeGreaterThan(0);
  expect(qohValue).not.toBe(coustomvalue);
  // verify that it should replace the custom value
});

test("Add one more item and verify the remove item of Qty From Transfer order list", async ({
  page,
}) => {
  // navigate directly to an order page
  await page.goto(
    "https://fulfillment-uat.hotwax.io/transfer-orders/<ORDER_ID>",
  );

  let serachInput = page.getByTestId('data-testid="search-product-input');
  await expect(serachInput).toBeVisible();
  await serachInput.fill("MH04LGreenHC"); // product name
  //verify taht product is visible in the serach result.
  await searchInput.press("Enter"); // hitting Enter
  await expect(page.getByText("MH04LGreenHC")).toBeVisible();

  //verify that can can add a item to the Transfer order by clcicking on Add to transfer button.
  let addtotransferbtn = page.getByTestId("Add-to-transfer-btn").first();
  await expect(addtotransferbtn).toBeVisible();
  await addtotransferbtn.click();
  let itemQtyInput = page.getByTestId("qty-input").Third();
  await expect(itemQtyInput).toBeVisible();
  await itemQtyInput.fill("4");
  await expect(itemQtyInput).toHaveValue("4");
  //verify the remove button funcationality.
  let removeBtn = page.getByTestId("remove-item-btn").Third();
  await expect(removeBtn).toBeVisible();
  await removeBtn.click();
  await expect(page.getByText("MH04LGreenHC")).not.toBeVisible();
});
