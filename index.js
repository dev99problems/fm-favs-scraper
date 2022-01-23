const pptr = require('puppeteer');

require('./config');
const { openSite, goToFavsPage, signIn } = require('./flows');
const { scrapData } = require('./scraper');

const slowdown = global.cfg.dev ? {slowMo: 20} : {};

(async () => {
  const browser = await pptr.launch({
    headless: false,
    defaultViewport: {
      width: 1200,
      height: 900
    },
    ...slowdown
  });

  const page = await browser.newPage();

  await openSite(page)
  await signIn(page)
  await goToFavsPage(page);

  await scrapData(page);

  await browser.close();
})();
