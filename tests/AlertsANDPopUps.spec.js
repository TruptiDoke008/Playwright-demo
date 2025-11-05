 const {test,expect} = require("@playwright/test");

 test('Alerts, confirmations & JAVA pop ups', async ({page})=>
{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    //This below line excute whenever there is any dialogue box get open.
    page.on('dialog', dialog=>dialog.accept()); //This will accept 
    // page.on('dialog', dialog=>dialog.dismiss()); //This will cancel 

    await page.locator("#confirmbtn").click();

    //Hover over the button

    await page.locator("#mousehover").hover();
    await page.pause();

});