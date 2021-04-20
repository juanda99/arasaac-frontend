/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

// export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
// export const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS';
// export const LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR';

/* default locale from browser */

import languages from 'data/languages'
export const appLocales = languages.map((language) => language.code)
appLocales.push('af')

// pt-br for brasilian
// valencian doesn't exist

// also used in MaterialsView

let navigatorLanguage = navigator.language.split('-')[0]
console.log(navigatorLanguage, 'navigatorLanguage') // es-ES get reduced to es
if (navigator.language === 'pt-br') navigatorLanguage = 'br'
export const DEFAULT_LOCALE = appLocales.includes(navigatorLanguage)
  ? navigatorLanguage
  : 'en'
