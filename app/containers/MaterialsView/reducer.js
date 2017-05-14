/*
 *
 * Materials View reducer
 *
 */

import { fromJS } from 'immutable'
import { MATERIALS, MATERIAL, SHOW_FILTERS, SET_FILTER_ITEMS } from './actions'

export const initialState = fromJS({
  showFilter: false,
  loading: false,
  error: false,
  search: {},
  searchText: '',
  filters: {
    Activity: [],
    Area: [],
    License: '',
    Language: ''
  },
  byId: []
})

function materialsViewReducer(state = initialState, action) {
  switch (action.type) {
    case MATERIAL.REQUEST:
      return state
        .set('loading', true)
        .set('error', false)
    case MATERIAL.SUCCESS:
      return state
        .set('loading', false)
        .setIn(['byId', action.payload.data.idMaterial], action.payload.data)
    case MATERIAL.FAILURE:
      return state
        .set('error', action.payload.error)
        .set('loading', false)
    case MATERIALS.REQUEST:
      return state
        .set('loading', true)
        .set('error', false)
        // it's not useful:
        // .set('searchText', action.payload.searchText)
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
    case SET_FILTER_ITEMS:
      return state
        .setIn(['filters', action.payload.filter], action.payload.values)
    default:
      return state
  }
}

export default materialsViewReducer
