const path = require('path');
const fs = require('fs');

const config = require('./config');

const { SELECTORS, SITE_ROOT_URL } = config;
const { card } = SELECTORS;

const ELEMS = {
  CARD: card.selector,
  CARD_TITLE: card.selector + ' ' + card.children.title,
  AUTHOR: card.selector + ' ' + card.children.author,
  COMPANY: card.selector + ' ' + card.children.company,
  LENGTH: card.selector + ' ' + card.children.length,
};

const scrapData = async (page) => {
  const courseTitles = await page.$$eval(ELEMS.CARD_TITLE, (elems) =>
    elems.map((el) => ({
      url: el.getAttribute('href'),
      title: el.innerText,
    }))
  );

  const authors = await page.$$eval(ELEMS.AUTHOR, (elems) =>
    elems.map((el) => el.innerText)
  );

  const companies = await page.$$eval(ELEMS.COMPANY, (elems) =>
    elems.map((el) => el.innerText)
  );

  const courseLengths = await page.$$eval(ELEMS.LENGTH, (elems) =>
    elems.map((el) => el.innerText)
  );

  const data = courseTitles.map((titleObj, idx) => ({
    title: titleObj.title,
    url: SITE_ROOT_URL + titleObj.url.slice(0, -1),
    author: authors[idx],
    authorFrom: companies[idx],
    length: courseLengths[idx]?.replace(' CC', '')
  }));

  fs.writeFile(path.join(__dirname, 'courses.json'), JSON.stringify(data), (err) => {
    if (err) return console.log('err', err);
    console.log('successfully written to courses.json');
  })
};

module.exports = {
  scrapData,
};
