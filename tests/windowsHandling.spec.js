const { test, expect } = require('@playwright/test'); //pacakges
const { waitForDebugger } = require('inspector');

test('Window Handling', async ({browser})=>
    {
        const context = await browser.newContext(); 
        
        const page = await context.newPage(); //new page will open
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); //goto URL
    
        const userName = page.locator('#username');
        const passWord = page.locator('#password');
        const signIn  = page.locator('[type="submit"]');
        const title = page.locator('.card-body a');
        const dropdown = page.locator('select.form-control');
        const blinkingText = page.locator('[href*="documents-request"]');
    
        await userName.fill('rahulshettyacademyy'); //Username
        await passWord.fill('learning'); //Pass
        await dropdown.selectOption('teach'); //drop down
        await page.locator('.checkmark').last().click(); //radio button
        await page.locator('#okayBtn').click();

        expect(await page.locator('.checkmark').last().isChecked()); //Checked if radio button is checked/Unchecked.
        console.log(await page.locator('.checkmark').last().isChecked()); //Print True if selected.

        await page.locator('#terms').uncheck();//uncheck the element.
        expect(await page.locator('#terms').isChecked()).toBeFalsy();
        //expect(...).toBeFalsy() → asserts that the value should be false (unchecked).
        //expect(...).toBeTruthy() → Asserts that the result should be true (checked).

        await expect(blinkingText).toHaveAttribute("class","blinkingText"); 
        //system will check "blinkingText" elements is having class with blinkingText or not.

        // await page.pause(); //use to pause the execution and see previous actions.

    });
