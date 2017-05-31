/*
 *
 * ConfigurationView reducer
 *
 */

import { combineReducers } from 'redux-immutable'
import filters from 'containers/ToggleFilter/reducer'
import filtersData from './filtersDataReducer'

export default combineReducers({
  filters,
  filtersData
})
