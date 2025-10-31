const { test, expect } = require('@playwright/test'); //pacakges
const { waitForDebugger } = require('inspector');

test('Window Handling', async ({page})=>
    {
        const date = "9";
        const month = "4";
        const year ="2027";
        const expectedList = [month,date,year];

        await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers"); //goto URL

        await page.locator(".react-date-picker__inputGroup").click(); //select calender box
        await page.locator(".react-calendar__navigation__label").click(); //click on top button 
        await page.locator(".react-calendar__navigation__label").click(); //click on top button

        await page.getByText(year).click(); //select year
        await page.locator(".react-calendar__year-view__months__month").nth(Number(month-1)).click();   //select month
        await page.locator("//abbr[text()='"+date+"']").click(); //select date

        const inputs =  page.locator('.react-date-picker__inputGroup__input')
 
        for(let i =0; i<expectedList.length;i++)
        {
            const value = await inputs.nth(i).inputValue();
            expect(value).toEqual(expectedList[i]);
     
        }


});