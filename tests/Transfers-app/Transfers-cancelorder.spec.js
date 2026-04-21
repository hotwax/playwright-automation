import { test, expect } from "@playwright/test";

test("Sanity | Transfer App | Cancel transfer order from Approved status", async ({
  page,
}) => {
  // Step 1: Navigate directly to Transfer Orders page
  await page.goto(
    "https://launchpad-dev.hotwax.io/login?isLoggedOut=true&redirectUrl=https://transfers-dev.hotwax.io/login",
  );
  await page.waitForTimeout(3000);

  await page.locator("#ion-input-0").fill("hotwax.user");
  await page.locator("#ion-input-1").fill("hotwax@786");
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForTimeout(3000);

  // Select transfer order from the list whoes status is Approved
  const approvedOrder = page.locator("div.section-header", {
    has: page.locator("ion-badge", { hasText: "Approved" }),
  });

  // await approvedOrder.first().waitFor({ state: "visible", timeout: 20000 });
  // await approvedOrder.first().click();
});
