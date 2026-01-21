import { test, expect } from "@playwright/test";

test("Sanity | Fulfillment bulk order flow - Rejectall", async ({ page }) => {
  // Step 1: Navigate to Open Orders page
  await page.goto("https://transfers-dev.hotwax.io/login?oms=dev-maarg&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyTG9naW5JZCI6ImhvdHdheC51c2VyIiwiaXNzIjoiZGV2LW9tcyIsImV4cCI6MTc2OTA2NTMzMCwiaWF0IjoxNzY4OTc4OTMwfQ.cj0GhO2yyVb9ycykmFBDkZKduIOTwi1dgLIPjMvRF-59yaeIqgSJ2P_iGqaHkJrcUYUOdSAV678ABeR4kmQ9XQ&expirationTime=1769065330356&omsRedirectionUrl=dev-oms");
  await page.waitForTimeout(2000);

  await page.locator("#ion-input-0").fill("hotwax.user");
  await page.locator("#ion-input-1").fill("hotwax@786");
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForTimeout(1000);




});
