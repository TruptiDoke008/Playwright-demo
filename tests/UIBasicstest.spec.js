
const { test, expect } = require('@playwright/test'); //test, expect are the packages.
//test is come from the playwright, async is use for await feature which is use to say to next line wait 
//first execute the above line.
//test("My Fisrt playwright test", async ({browser})=>   in this test ("String", function(),
//if you use only () braces without function keyword then it's called annonymous function and uh need to use '=>' fatty operator.
//({browser}): is a fictior which is use to invoke browser.

test('My Fisrt playwright test', async ({browser})=>
{
    //to open/invoke browser
    
    const context = await browser.newContext(); 
    //newContext() in this you have to declaire specific parameter like in built cookies n other related store data.
    //If not providing any para then only use "page" in the top as like below method. 
    
    const page = await context.newPage(); //new pgae will open
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); //goto URL
    console.log(await page.title()); //Print the title of WebPage.
    await expect(page).toHaveTitle("Google")

});

test('My scond playwright test with Page', async ({page})=>
    {
        //Another method to invoke the fresh page.
        await page.goto("https://google.com"); //goto URL   
        console.log(await page.title()); //Print the title of WebPage.
        await expect(page).toHaveTitle("Google") 
    });

