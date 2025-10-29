const {test, expect} = require ("@playwright/test");
const { waitForDebugger } = require('inspector');

test('End to End Coding', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const productName = "ZARA COAT 3";

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    const userName = page.locator('#userEmail');
    const pass = page.locator('#userPassword');
    const signInBtn = page.locator('#login');
    const products = page.locator('.card-body');

    await userName.fill('truptidoke008@gmail.com');
    await pass.fill('Vikroli@123');
    await signInBtn.click();

    await page.waitForLoadState('networkidle'); // wait for all the titles get loaded.
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    const count = await products.count(); //store the count of all products.
    for(let i=0; i<count; ++i)
    {
        if(await products.nth(i).locator('b').textContent() === productName) 
            //b is the contains the titles see above const titles css path.
        {
            //add product to the cart.
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor(); 
    //wait for page 1st element get loaded. in short wait until items are not get loaded.

    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    /* h3 is tag for all product names.
    :has-tex is from sudo class and use to search the element by it's text.
    isVisible()  method check the element is visible on the page or not. It will give the value in boolean.
    */

    expect(bool).toBeTruthy();
    //.toBeTruthy() → checks if the value inside expect() evaluates to true in a Boolean context.

    await page.locator("button[type='button']").last().click(); //checkout button

    //Fill up the Personal Information
    //CVV Code
    await page.locator(".field.small input").first().fill('123');

    //Name of card
    await page.locator(".field input").nth(2).fill("Trupti Doke");

    //apply cupon
    await page.locator(".field.small input").last().fill('Trupti@123');

    page.pause();

    //Shipping Information : Dynamic drop down.

    await page.locator("[placeholder*='Select']").pressSequentially("ind", { delay: 150 });
    /*Here, a delay of 150 milliseconds is introduced between each key press.
    That means it enters  i → (delay 150 ms) → enters n → (delay 150 ms) → enters d
    By doing this, you give the application enough time to respond with the relevant options. */

    //If you directly send the keys by fill then drop down will not open.

    const dropDown = await page.locator(".ta-results").waitFor(); //wait to drop down options get display.
    const dropCount = await dropDown.locator("button").count(); //get the count of drop down elements.
    for(let i=0; i<dropCount; ++i)
    {
        text = await dropDown.locator("button").nth(i).textContent();
        if(text === " India")
        {
            dropDown.locator("button").nth(i).click();
            break;
        }
    }

    await page.pause();



});
