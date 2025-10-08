import { defineConfig, devices } from '@playwright/test';


const config = ({
  testDir: './tests',
   timeout: 40*1000,   //explicitly give wait.
   expect: {
    timeout: 40*1000, //Timeout for assertion.
   },
   reporter : 'html',
  use: {
    browserName : 'chromium',
    headless : false //this line is use because by deafault playwright run the script in headless mode and we want to invoke the broser.

  },

  
});
module.exports = config
