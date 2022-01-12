const pptr = require('puppeteer');

(async () => {
  const browser = await pptr.launch();

  // const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();

