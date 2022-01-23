const config = require('./config');

const { SITE_ROOT_URL, PAGES, CREDS, SELECTORS } = config;
const { loginLink, loginForm } = SELECTORS;

const ELEMS = {
  LOGIN_LINK: loginLink,
  LOGIN_USERNAME: loginForm.children.username,
  LOGIN_PASSWORD: loginForm.children.password,
  SIGN_IN_BTN: loginForm.children.loginButton,
};

const slowdown = global.cfg.dev ? {} : { delay: 100 };

const openSite = async (page) => await page.goto(SITE_ROOT_URL + PAGES.login);

const goToLoginPage = async (page) => await page.click(ELEMS.LOGIN_LINK);

const signIn = async (page) => {
  await page.type(ELEMS.LOGIN_USERNAME, CREDS.email, slowdown);
  await page.type(ELEMS.LOGIN_PASSWORD, CREDS.password, slowdown);

  await page.click(ELEMS.SIGN_IN_BTN);
}

const goToFavsPage = async (page) => await page.goto(SITE_ROOT_URL + PAGES.favs)

module.exports = {
  openSite,
  goToLoginPage,
  signIn,
  goToFavsPage,
}

