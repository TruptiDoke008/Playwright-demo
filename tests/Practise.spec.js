const{test,expect} = require('@playwright/test');
const { waitForDebugger } = require('inspector');

test("Practise", async ({browser})=>
{
    const context = await browser.newContext(); 
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    const userName = page.locator("#userEmail");
    const pass = page.locator("#userPassword");
    const signINBtn = page.locator("#login");

    await userName.fill("truptidoke008@gmail.com");
    await pass.fill("Vikroli@123");
    await signINBtn.click();

    await page.waitForLoadState('networkidle'); 
    //wait for load all the titles of the products
    //If not add this line to the code then in output you will get empty array.
    //This line may be flaky. So if it's not work use below method.

    //await page.locator(".card-body h5 b").waitFor(); 
    //Wait until the elemnet is loaded.

    const titles = await page.locator(".card-body h5 b").allTextContents();
    console.log(titles);


});