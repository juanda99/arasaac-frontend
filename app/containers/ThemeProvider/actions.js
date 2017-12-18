/*
 *
 * ThemeProvider actions
 *
 */

export const DEFAULT_THEME = 'LIGHT'
export const THEMES = {
  DARK: 'DARK',
  LIGHT: 'LIGHT',
  HIGH_CONTRAST: 'HIGH_CONTRAST'
}
export const CHANGE_THEME = 'app/ThemeProvider/CHANGE_THEME'
export const changeTheme = (theme) => ({ type: CHANGE_THEME, theme })

