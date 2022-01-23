global.cfg = {
  dev: true
};

const CREDS = {
  email: '',
  password: ''
};

const SITE_ROOT_URL = 'https://frontendmasters.com';

const PAGES = {
  favs: '/courses/#bookmarked',
  login: '/login/'
};

const SELECTORS = {
  loginLink: 'header li.item a[href="/login/"]',
  loginForm: {
    selector: 'form#loginForm',
    children: {
      username: 'input#username',
      password: 'input#password',
      loginButton: 'button[type="submit"]'
    }
  },
  card: {
    selector: 'li.MediaItem.selected',
    children: {
      title: 'h2 a',
      link: 'h2 a',
      author: 'div.Instructor a div.name',
      company: 'div.Instructor a div.organization',
      length: 'div.meta'
    }
  }
};

const AIRTABLE = {
  tableName: 'Frontend Masters',
  tableId: '',
  apiKey: '',
};

const config = {
  CREDS,
  SITE_ROOT_URL,
  PAGES,
  SELECTORS,
  AIRTABLE
};

module.exports = config;
