/*
 *
 * Materials View reducer
 *
 */

import { fromJS, List } from 'immutable'
import { MATERIAL } from 'containers/MaterialView/actions'
import { MATERIALS, NEW_MATERIALS, SHOW_FILTERS, SET_FILTER_ITEMS } from './actions'

export const initialState = fromJS({
  showFilter: false,
  loading: false,
  error: false,
  search: {},
  searchText: '',
  filters: {
    activity: List(),
    area: List(),
    language: List()
  },
  materials: {},
  newMaterials: []
})

function materialsViewReducer(state = initialState, action) {
  let newMaterial
  switch (action.type) {
    case MATERIAL.REQUEST:
      return state
        .set('loading', true)
        .set('error', false)
    case MATERIAL.SUCCESS:
      return state
        .set('loading', false)
        .setIn(['materials', action.payload.data.idMaterial], action.payload.data)
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
      newMaterial = fromJS(action.payload.data.entities.materials || {})
      return state
        .set('loading', false)
        .setIn(['search', action.payload.locale, action.payload.searchText], action.payload.data.result)
        .mergeIn(['materials'], newMaterial)
    case MATERIALS.FAILURE:
      return state
        .set('error', action.payload.error)
        .set('loading', false)
    case NEW_MATERIALS.REQUEST:
      return state
        .set('loading', true)
        .set('error', false)
    case NEW_MATERIALS.SUCCESS:
      newMaterial = fromJS(action.payload.data.entities.materials || {})
      return state
        .set('loading', false)
        .set('newMaterials', action.payload.data.result)
        .mergeIn(['materials'], newMaterial)
    case NEW_MATERIALS.FAILURE:
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
