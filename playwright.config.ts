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
    screenshot : 'on', //if you want the screenshot of every step.
    trace : 'on' //trace means each and every step how it executed shows in details
  },

  
});
module.exports = config
