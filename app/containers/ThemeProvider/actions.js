/*
 *
 * ThemeProvider actions
 *
 */

const THEME_NAMES = {
  DARK: "DARK",
  LIGHT: "LIGHT",
  HIGH_CONTRAST: "HIGH_CONTRAST",
};
const DEFAULT_THEME = THEME_NAMES.LIGHT;
const THEMES = [];
Object.entries(THEME_NAMES).forEach(([value]) => {
  THEMES.push(value);
});
const CHANGE_THEME = "app/ThemeProvider/CHANGE_THEME";
const changeTheme = (theme) => ({ type: CHANGE_THEME, theme });

export { THEME_NAMES, DEFAULT_THEME, THEMES, CHANGE_THEME, changeTheme };
