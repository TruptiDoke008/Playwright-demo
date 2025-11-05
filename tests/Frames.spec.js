const {test,expect} = require("@playwright/test");

test('Frames', async ({page})=>
{

   await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

   const framepg = await page.frameLocator("#courses-iframe"); 
   //Store the farme into the variable to perform further actions.

    await framepg.locator("li a[href*='lifetime-access']:visible").click();
    //  :visible is used when there are two elemnets are matching and one of them is not visible on the page
    //and you want to select the visible element.

    const testCheck = await framepg.locator(".text h2").textContent(); //grab the text
    console.log(testCheck.split(" ")[1]); //take the number from the text



});