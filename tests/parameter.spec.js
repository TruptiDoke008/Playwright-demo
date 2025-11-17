const { test, expect, request } = require('@playwright/test');
// const { APiUtils } = require('../utils/APiUtils');

const loginPayLoad = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "67a8dde5c0d3e6622a297cc8" }] };
const fakePayLoadOrders = { data: [], message: "No Orders" };

let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APiUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad);
});

test('@SP Place the order', async ({ page }) => {

  // inject token in localStorage
  await page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, response.token);

  // intercept BEFORE navigation
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(fakePayLoadOrders)
      });
    }
  );

  await page.goto("https://rahulshettyacademy.com/client");

  await page.locator("button[routerlink*='myorders']").click();

  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");

  console.log(await page.locator(".mt-4").textContent());
});
