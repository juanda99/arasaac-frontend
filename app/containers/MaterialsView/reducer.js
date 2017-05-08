/*
 *
 * Materials View reducer
 *
 */

import { fromJS } from 'immutable'
import { MATERIALS, SHOW_FILTERS } from './actions'

export const initialState = fromJS({
  showFilter: false,
  loading: false,
  error: false,
  search: fromJS({}),
  searchText: '',
  filters: fromJS({
    activity: [],
    area: [],
    license: [],
    language: []
  })
})

function materialsViewReducer(state = initialState, action) {
  switch (action.type) {
    case MATERIALS.REQUEST:
      return state
        .set('loading', true)
        .set('error', false)
        .set('searchText', action.payload.searchText)
    case MATERIALS.SUCCESS:
      return state
        .setIn(['search', action.payload.locale, action.payload.searchText], action.payload.data)
    case MATERIALS.FAILURE:
      return state
        .set('error', action.payload.error)
        .set('loading', false)
    case SHOW_FILTERS:
      return state
        .set('showFilter', !state.get('showFilter'))
    default:
      return state
  }
}

export default materialsViewReducer
