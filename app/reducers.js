/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from "redux-immutable";
import { fromJS } from "immutable";
import { loadingBarReducer } from "react-redux-loading-bar";
import { LOCATION_CHANGE } from "react-router-redux";
import { reducer as form } from "redux-form/immutable";
import languageProviderReducer from "containers/LanguageProvider/reducer";
import pictogramsViewReducer from "containers/PictogramsView/reducer";
import materialsViewReducer from "containers/MaterialsView/reducer";
import themeProviderReducer from "containers/ThemeProvider/reducer";
import tourReducer from "containers/HomePage/reducer";
import auth from "containers/App/reducer";
// import register from 'containers/SignupView/reducer'
/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

export const INITIAL_LAYOUT = "modules";
export const INITIAL_FILTERS = "";
/*
export const PICTOGRAMS_LAYOUT = 'PICTOGRAMS_LAYOUT'

export const CHANGE_PICTOGRAMS_KEYWORD = 'CHANGE_PICTOGRAMS_KEYWORD'

export const PICTOGRAMS_REQUEST = 'PICTOGRAMS_REQUEST'
export const PICTOGRAMS_SUCCESS = 'PICTOGRAMS_SUCCESS'
export const PICTOGRAMS_FAILURE = 'PICTOGRAMS_FAILURE'

export const LOCALE_CHANGE = 'LOCALE_CHANGE'

export const KEYWORDS_REQUEST = 'KEYWORDS_REQUEST'
export const KEYWORDS_SUCCESS = 'KEYWORDS_SUCCESS'
export const KEYWORDS_FAILURE = 'KEYWORDS_FAILURE'

export const SHOW_FILTER = 'SHOW_FILTER'
export const TOGGLE_FILTER = 'TOGGLE_FILTER'
*/

/*
const storageState = {
  locationBeforeTransitions: null,
  locale: 'en',
  gui: {
    layout: INITIAL_LAYOUT,
    showFilter: true,
    filters: INITIAL_FILTERS
  },
  isAuthenticated: false
}
*/
// The initial state of the App
// const initialState = fromJS(storageState)

// Initial routing state
const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  return combineReducers({
    route: routeReducer,
    theme: themeProviderReducer,
    language: languageProviderReducer,
    loadingBar: loadingBarReducer,
    auth,
    form,
    pictogramsView: pictogramsViewReducer,
    materialsView: materialsViewReducer,
    tour: tourReducer,
    ...asyncReducers,
  });
}
