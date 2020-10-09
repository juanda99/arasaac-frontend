/*
 *
 * LanguageProvider actions
 *
 */

export const CHANGE_LOCALE = "app/LanguageToggle/CHANGE_LOCALE";
export const START_TRANSLATION = "app/LanguageToggle/START_TRANSLATION";
export const STOP_TRANSLATION = "app/LanguageToggle/STOP_TRANSLATION";
export const changeLocale = (languageLocale) => ({
  type: CHANGE_LOCALE,
  locale: languageLocale,
});
export const startTranslation = () => ({ type: START_TRANSLATION });
export const stopTranslation = () => ({ type: STOP_TRANSLATION });
