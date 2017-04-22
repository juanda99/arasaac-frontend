/*
 *
 * PictogramsView reducer
 *
 */

import { fromJS } from 'immutable'
import { PICTOGRAMS, AUTOCOMPLETE, SHOW_FILTERS } from './actions'

export const initialState = fromJS({
  showFilter: false,
  loading: false,
  error: false,
  search: fromJS({}),
  words: fromJS({}),
  searchText: ''
})

function pictogramsViewReducer(state = initialState, action) {
  let newData = {}
  switch (action.type) {
    case PICTOGRAMS.REQUEST:
      return state
        .set('loading', true)
        .set('error', false)
        .set('searchText', action.payload.searchText)
    case PICTOGRAMS.SUCCESS:
      newData[action.payload.searchText] = action.payload.data
      newData = fromJS({ search: newData })
      return state
        .mergeDeep(newData)
        .set('loading', false)
    case PICTOGRAMS.FAILURE:
      return state
        .set('error', action.payload.error)
        .set('loading', false)
    case AUTOCOMPLETE.REQUEST:
      return state
    case AUTOCOMPLETE.SUCCESS:
      return state
        .setIn(['words', action.payload.locale], action.payload.data)
    case AUTOCOMPLETE.FAILURE:
      return state
        .setIn(['words', action.locale], action.data)
    case SHOW_FILTERS:
      return state
        .set('showFilter', !state.get('showFilter'))
    default:
      return state
  }
}

export default pictogramsViewReducer
