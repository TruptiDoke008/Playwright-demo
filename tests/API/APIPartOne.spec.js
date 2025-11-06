const {test, expect, request} = require ("@playwright/test"); //request is use for API Calls.
const { waitForDebugger } = require('inspector');
const loginPayLoad = {userEmail: "truptidoke008@gmail.com", userPassword: "Vikroli@123"};
/*
1.Inspect > Network tab> click on clear button.
2.Enter the Credentials click on Log in button.
3.Expand the CDP tool window go to Name > Login > PayLoad tab and copy the credentials. 
*/
let token; //declaire token here so accessible from everywhere.
test.beforeAll(async () => 
    {
    // beforeAll: runs once before all tests.
    const apiContext = await request.newContext(); // Creates a new API request context (like a new browser context).
  
    const loginResponse = await apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: loginPayLoad // Pass the login credentials here.
      }
    );
  
    expect(loginResponse.ok()).toBeTruthy(); // Verifies the response status (200 or 201).
    
    const loginResponseJson = await loginResponse.json(); // Converts the response to JSON.
    token = loginResponseJson.token; // Extracts the token.
    
    console.log("Login token:", token);
});


test.beforeEach(async()=>
    //Run Before each test.
{

});


test('API', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();

    //By using below block of code sign in page will get skip for fater TC execution
    await page.addInitScript(
        (value) => // addInitScript will initialize the script
        {
            window.localStorage.setItem('token',value); 
            //get the data from broswer local storage as data is store in chrome local storage.
            //Inspect > Application tab > Storage > Local Storage
        },
        token //Pass the above token data
    );
    
    const productName = "ZARA COAT 3";
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    const products = page.locator('.card-body');
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