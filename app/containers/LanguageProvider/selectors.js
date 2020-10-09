import { createSelector } from "reselect";

/**
 * Direct selector to the languageToggle state domain
 */
const selectLanguage = () => (state) => state.get("language");

/**
 * Select the language locale
 */

const makeSelectLocale = () =>
  createSelector(selectLanguage(), (languageState) =>
    languageState.get("locale")
  );

const makeSelectDirection = () =>
  createSelector(selectLanguage(), (languageState) =>
    languageState.get("direction")
  );

export { selectLanguage, makeSelectLocale, makeSelectDirection };
