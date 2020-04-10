/*
 *
 * Materials View reducer
 *
 */

import { fromJS, List, Map } from 'immutable'
import {
  MATERIALS,
  NEW_MATERIALS,
  SHOW_FILTERS,
  SET_FILTER_ITEMS,
  MATERIAL_PUBLISH,
  MATERIAL_REMOVE,
  MATERIAL,
  MATERIAL_UPDATE,
  MATERIALS_NOT_PUBLISHED
} from './actions'

export const initialState = fromJS({
  showFilter: false,
  loading: false,
  error: false,
  search: {},
  searchText: '',
  filters: {
    activities: List(),
    areas: List(),
    languages: List()
  },
  materials: {},
  newMaterials: []
})

function materialsViewReducer(state = initialState, action) {
  let newMaterial
  switch (action.type) {

    case MATERIAL.REQUEST:
    case MATERIALS.REQUEST:
    case MATERIAL_REMOVE.REQUEST:
    case MATERIAL_PUBLISH.REQUEST:
    case MATERIAL_UPDATE.REQUEST:
    case NEW_MATERIALS.REQUEST:
    case MATERIALS_NOT_PUBLISHED.REQUEST:
      return state
        .set('loading', true)
        .set('error', false)
    case MATERIAL.SUCCESS:
      newMaterial = fromJS(action.payload.data || {})
      return state
        .set('loading', false)
        .setIn(['materials', action.payload.data.idMaterial], newMaterial)
    case MATERIAL_REMOVE.SUCCESS:
      // need parseInt when remove from MaterialView
      const { idMaterial } = (action.payload.data)
      const newMaterials = state.get('newMaterials').filter((item) => item !== parseInt(idMaterial))
      return state
        .set('loading', false)
        .deleteIn(['materials', idMaterial])
        .set('search', Map()) // we remove searches as it can be there....
        .set('newMaterials', newMaterials)
    case MATERIAL_PUBLISH.SUCCESS:
    case MATERIAL_UPDATE.SUCCESS:
      newMaterial = fromJS(action.payload.data || {})
      return state
        .set('loading', false)
        .setIn(['materials', action.payload.data.idMaterial], newMaterial)
    case MATERIAL_REMOVE.FAILURE:
    case MATERIAL_PUBLISH.FAILURE:
    case MATERIALS_NOT_PUBLISHED.FAILURE:
    case MATERIAL_UPDATE.FAILURE:
      return state
        .set('error', action.payload.error)
        .set('loading', false)

    case MATERIALS.SUCCESS:
      newMaterial = fromJS(action.payload.data.entities.materials || {})
      return state
        .set('loading', false)
        .setIn(['search', action.payload.locale, action.payload.searchText], action.payload.data.result)
        .mergeIn(['materials'], newMaterial)
    case MATERIALS_NOT_PUBLISHED.SUCCESS:
      const notPublishedMaterials = fromJS(action.payload.data || [])
      return state
        .set('loading', false)
        .mergeIn(['materials'], notPublishedMaterials)
    case MATERIALS.FAILURE:
      return state
        .set('error', action.payload.error)
        .set('loading', false)
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
