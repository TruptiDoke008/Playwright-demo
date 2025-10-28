const { test, expect } = require("@playwright/test")
const { waitForDebugger } = require('inspector');

test('Child Window Handles', async ({browser}) => 
    {
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

        const blinkingText = page.locator('[href*="documents-request"]');

        const [newPage] = await Promise.all 
        //Promise.all use to run the code parallel there are more two types:
        //Promise.pending and Promise.rejected
        ([
            context.waitForEvent('page'), //wait until the new page get loaded/open
            blinkingText.click(),
        ])
        const text = await newPage.locator('.red').textContent();
        console.log(text);

        const arrayText= text.split("@");
        const domain = arrayText[1].split(" ")[0];
        console.log(domain);

        await page.locator('#username').fill(domain);
        await page.pause();
        console.log(await page.locator('#username').inputValue());
        /*inputValue() use when there is dynamic changes in textbox
        inputValue(): 
        To get the current value (user-entered text) of an <input>, <textarea>, or editable element. */

        console.log(await page.locator('#username').textContent());
        /*textContent():
        To get the inner text (visible text content) of any element like <div>, <span>, <p>, etc. */

    });