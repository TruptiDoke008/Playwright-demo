import { test, expect } from '@playwright/test';

//test are run in serial mode if you want to run parallel mode need to give below command.
test.describe.configure({mode:'parallel'}); //now test will run in parallel mode.

test('@Web has title', async ({ page }) => {
  //@web or /@API or customize annotations use when you only want to run those tests.
  //npx playwright test ./tests/Basics --grep '@web'     use this to run perticular annotation.
  
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('@API get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
