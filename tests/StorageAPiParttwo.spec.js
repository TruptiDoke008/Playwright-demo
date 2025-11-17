const {test, expect} = require ("@playwright/test");
const { waitForDebugger } = require('inspector');

let webContext;

test.beforeAll(async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    const userName = page.locator('#userEmail');
    const pass = page.locator('#userPassword');
    const signInBtn = page.locator('#login');
    
    const email = "truptidoke008@gmail.com";

    await userName.fill(email);
    await pass.fill('Vikroli@123');
    await signInBtn.click();

    await page.waitForLoadState('networkidle'); 
    await context.storageState({path: 'state.json'});
    //at context level it will create the one file to storage the cookies like information.

    webContext = await browser.newContext({storageState:'state.json'});
    //invoking the new broser and passing the already store info in state.json to new page.



})

test('End to End Coding', async ()=>
{
    
    const productName = "ZARA COAT 3";
    

    const page = await webContext.newPage(); //new page is invoking
    const products = page.locator('.card-body');
    
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    //it will skip the log in page bcz passing the store file data

    // wait for all the titles get loaded.
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

    //Shipping Information : Dynamic drop down.

    await page.locator("[placeholder*='Select']").pressSequentially("ind", { delay: 150 });
    /*Here, a delay of 150 milliseconds is introduced between each key press.
    That means it enters  i → (delay 150 ms) → enters n → (delay 150 ms) → enters d
    By doing this, you give the application enough time to respond with the relevant options. */

    //If you directly send the keys by fill then drop down will not open.

    const dropDown = page.locator(".ta-results");
    await dropDown.waitFor();//wait to drop down options get display.
    const dropCount = await dropDown.locator("button").count(); //get the count of drop down elements.
    for(let i=0; i<dropCount; ++i)
    {
        const text = await dropDown.locator("button").nth(i).textContent();
        if(text === " India")
        {
            await dropDown.locator("button").nth(i).click();
            break;
        }
    }

    await expect(page.locator(".user__name [type='text']").first()).toHaveText("truptidoke008@gmail.com");
    //Check the grayed out email is correct or not.


    //Click on Place Order button
    await page.locator(".actions a").click();

    await page.locator(".hero-primary").waitFor();

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    //cross check if the text is preset or not.


    //Print order id
    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").first().textContent();
    console.log(orderID);


    //click on Orders button
    await page.locator("[routerlink*='myorders']").first().click();
    
    await page.locator("tbody tr").first().waitFor();

    const rows = await page.locator("tbody tr");
    for(let i=0; i< await rows.count(); ++i)
    {
        const ordertexts = await rows.nth(i).locator("th").textContent();
        if(orderID.includes(ordertexts)) //innclude use to check if the text is include in that element or not.  
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const country = await expect(page.locator(".address p").last()).toHaveText(" Country - India ");
    console.log(country);
    await page.pause();
});