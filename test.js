const puppeteer = require('puppeteer');
const testConfig = require('./config');

(async () => {
  /* Pupeeter initialization*/
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  /*Setting up site*/
  await page.goto(testConfig.pageToOpen);
  await page.waitForSelector('.BwoPOe');
  await page.click('.BwoPOe');
  await page.waitForSelector('a.iOGqzf.H4qWMc.aXIg1b');

  /* Attaching the file*/
  await page.click('a.iOGqzf.H4qWMc.aXIg1b');
  const inputUploadHandle = await page.$('input[type=file]');
  inputUploadHandle.uploadFile(testConfig.fileToUpload);

  /* Checking searching results*/
  await page.waitForSelector('.chip_text');
  await page.waitForNavigation({waitUntil: 'networkidle0'});
  let element = await page.$('.chip_text');
  let value = await page.evaluate(el => el.textContent, element);
  value === testConfig.fileToUpload ? console.log('Search results are related to the uploaded image') : console.log(' !!! Search results are NOT related to the uploaded image !!!!');
  await page.screenshot({ path: testConfig.searchValidate, fullPage: true});

  /* Checking link result*/
  const linkResult = await page.$$('.LC20lb.DKV0Md');
  await linkResult[testConfig.linkPosition-1].click();
  await page.waitForNavigation();
  await page.screenshot({ path: testConfig.visitedPage, fullPage: true });
  await browser.close();
  console.log('Test passed! Check results stored in '+ testConfig.searchValidate + ' and ' + testConfig.visitedPage);
})();