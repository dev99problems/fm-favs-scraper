const Airtable = require('airtable');
const { AIRTABLE } = require('./config');
const coursesRaw = require('./courses.json');

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: AIRTABLE.apiKey,
});

const base = Airtable.base(AIRTABLE.tableId);
const ITEMS_PER_PAGE = 10;

const prepareCourses = (rawData = []) =>
  rawData.map((dataRow) => ({
    fields: {
      Course: dataRow.title,
      Link: dataRow.url,
      Author: dataRow.author,
      'Author From': dataRow.authorFrom,
      Length: dataRow.length,
      Status: 'Backlog'
    }
  }));

const createCourseRecords = (courses) => new Promise((resolve, reject) => {
  base('List').create(courses, (err, records) => {
    if (err) {
      console.error(err);
      reject(err);
    }

    console.log(`
      Successfully written from: "${records[0].get('Course')}" to "${records[records.length - 1].get('Course')}"
    `);
    resolve();
  });
})

const main = async () => {
  const preparedCourses = prepareCourses(coursesRaw);
  const coursesCount = preparedCourses.length;
  const num = ITEMS_PER_PAGE;

  for (let startIdx = 0; startIdx < coursesCount; startIdx += num) {
    const endIdx = Math.min(startIdx + num, coursesCount);
    const dataSlice = preparedCourses.slice(startIdx, endIdx);
    await createCourseRecords(dataSlice);
  }
};

(async () => {
  try {
    await main();
  } catch (err) {
    console.error(err)
  }
})();
