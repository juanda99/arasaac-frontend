/*
 *
 * ThemeProvider reducer
 *
 */

import { CHANGE_THEME, DEFAULT_THEME } from "./actions";

export const initialState = DEFAULT_THEME;

function themeProviderReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_THEME:
      return action.theme;
    default:
      return state;
  }
}

export default themeProviderReducer;
