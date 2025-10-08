const { test, expect } = require('@playwright/test'); 
const { waitForDebugger } = require('inspector');

test.only('My Fisrt playwright test', async ({browser})=>
{
    const context = await browser.newContext(); 
    
    const page = await context.newPage(); //new pgae will open
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); //goto URL

    const userName = page.locator('#username');
    const passWord = page.locator('#password');
    const signIn  = page.locator('[type="submit"]');
    
    
    //CSS supports playwright more than xpath. Hence Css selector is recommonded to use. 

    await userName.fill('rahulshettyacademyy'); //Username
    await passWord.fill('learning'); //Pass
    await signIn.click(); //click on nsign in button
    console.log(await page.locator('[style*="block"]').textContent());
    await expect(page.locator('[style*="block"]')).toContainText('Incorrect') //Assertion to check contain text is correct or not.

    //clear the username previous field as that was wrong data.
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    // await passWord.fill('learning'); //Pass
    await signIn.click();

    //Product page
    //Get the text of products
    console.log(await page.locator('.card-body a').nth(0).textContent()); //o/p: iphone X
    //.nth(0) will return the first elemnet of the list bcz we total have 4 elemnets in the same css path.

    console.log(await page.locator('.card-body a').nth(1).textContent()); //o/p:Samsung Note 8    

    console.log(await page.locator('.card-body a').first().textContent());//o/p: iphone X
    //.first() return the 1st element of the list.
    console.log(await page.locator('.card-body a').last().textContent());//o/p: Blackberry
    //.last() return the last element of the list.





});