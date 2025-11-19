import { defineConfig, devices } from '@playwright/test';
import { trace } from 'console';
import { permission } from 'process';


const config = ({
  testDir: './tests',
  retires : 1, //fail test case retry once, handle flaky test cases. you can change the no. accordingly.
   timeout: 40*1000,   //explicitly give wait.
   expect: {
    timeout: 40*1000, //Timeout for assertion.
   },
   reporter : 'html',
  use: {
    browserName : 'chromium',
    headless : false, //this line is use because by deafault playwright run the script in headless mode and we want to invoke the broser.
    screenshot : 'on', //if you want the screenshot of FAIL step.
    trace : 'on', //trace means each and every step how it executed shows in details. This will give results for all tests pass and fail.
    //trace : 'retain-on-failure' // give the reports (zip file) only when test cases are fail.
    // ...devices['iPhone 15 Pro Max landscape'],  //Screen will show in iphone 16 mode- you can change the devices as per need.
    // viewport: { width: 720, height: 720 }, //This will help to manage the screen pixels.

    //SSL certifide website handle by playwright - it will automatically click on advanced and open nect page if there is any SSL Page.
    ignoreHttpsErros:true,

    //Allow to system locations
    permission:['geolocation'],

  },

  
});
module.exports = config
