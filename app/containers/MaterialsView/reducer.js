/*
 *
 * Materials View reducer
 *
 */

import { fromJS, Set } from 'immutable'
import { MATERIALS, SHOW_FILTERS, ADD_FILTER, REMOVE_FILTER } from './actions'

const emptySet = Set(['prueba'])

export const initialState = fromJS({
  showFilter: false,
  loading: false,
  error: false,
  search: {},
  searchText: '',
  filters: {
    Activity: emptySet,
    Area: emptySet,
    License: emptySet,
    Language: emptySet
  }
})

function materialsViewReducer(state = initialState, action) {
  let filterSet
  switch (action.type) {
    case MATERIALS.REQUEST:
      return state
        .set('loading', true)
        .set('error', false)
        .set('searchText', action.payload.searchText)
    case MATERIALS.SUCCESS:
      return state
        .set('loading', false)
        .setIn(['search', action.payload.locale, action.payload.searchText], action.payload.data)
    case MATERIALS.FAILURE:
      return state
        .set('error', action.payload.error)
        .set('loading', false)
    case SHOW_FILTERS:
      return state
        .set('showFilter', !state.get('showFilter'))
    case ADD_FILTER:
      filterSet = state.getIn(['filters', action.payload.type])
      return state
        .setIn(['filters', action.payload.type], filterSet.add(action.payload.value))
    case REMOVE_FILTER:
      filterSet = state.getIn(['filters', action.payload.type])
      return state
        .setIn(['filters', action.payload.type], filterSet.remove(action.payload.value))
    default:
      return state
  }
}

export default materialsViewReducer
