const {test, expect} = require("@playwright/test");

test('more validations', async ({page}) =>
{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://google.com");

    // await page.goBack(); //go to back page but before previous page get fully loaded.
    // await page.goForward(); //Go to next page but before previous page get fully loaded.

    await expect (page.locator("#displayed-text")).toBeVisible();//check if textbox visible or not

    await page.locator("#hide-textbox").click(); //hide the text box

    await expect (page.locator("#displayed-text")).toBeHidden();//now check  if txt box is hidden or not

});