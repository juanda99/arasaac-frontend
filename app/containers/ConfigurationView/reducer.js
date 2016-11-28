/*
 *
 * ConfigurationView reducer
 *
 */

import { combineReducers } from 'redux-immutable'
import filters from 'containers/ToggleFilter/reducer'

export default combineReducers({
  filters
})
