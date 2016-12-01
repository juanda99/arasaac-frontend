/*
 *
 * PictogramsView reducer
 *
 */

import { fromJS } from 'immutable'
import { PICTOGRAMS, AUTOCOMPLETE, SHOW_FILTERS } from './actions'

const initialState = fromJS({ showFilter: false })

function pictogramsViewReducer(state = initialState, action) {
  switch (action.type) {
    case PICTOGRAMS.REQUEST:
      return state
    case PICTOGRAMS.SUCCESS:
      return state
        .setIn(['search', action.searchText], action.data)
    case PICTOGRAMS.FAILURE:
      return state
        .setIn(['search', action.searchText], action.data)
    case AUTOCOMPLETE.REQUEST:
      return state
    case AUTOCOMPLETE.SUCCESS:
      return state
        .setIn(['autocomplete', action.searchText], action.data)
    case AUTOCOMPLETE.FAILURE:
      return state
        .setIn(['autocomplete', action.searchText], action.data)
    case SHOW_FILTERS:
      return state
        .set('showFilter', !state.showFilter)
    default:
      return state
  }
}

export default pictogramsViewReducer
