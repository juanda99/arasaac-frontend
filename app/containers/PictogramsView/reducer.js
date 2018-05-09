/*
 *
 * PictogramsView reducer
 *
 */

import { fromJS } from 'immutable'
import { PICTOGRAM } from 'containers/PictogramView/actions'
import { PICTOGRAMS, NEW_PICTOGRAMS, AUTOCOMPLETE, SHOW_FILTERS, SET_FILTER_ITEMS } from './actions'

export const initialState = fromJS({
  showFilter: false,
  loading: false,
  error: false,
  search: {},
  words: {},
  searchText: '',
  filters: {
    License: []
    // maybe filter by tags???
  },
  pictograms: { es: {}, en: {}, fr: {} },
  newPictograms: []
})

function pictogramsViewReducer(state = initialState, action) {
  let newPictogram = {}
  let idPictogram
  switch (action.type) {
    case PICTOGRAM.REQUEST:
      return state
        .set('loading', true)
        .set('error', false)
    case PICTOGRAM.SUCCESS:
      newPictogram = fromJS(action.payload.data || {})
      idPictogram = action.payload.data.idPictogram.toString()
      return state
        .set('loading', false)
        .setIn(['pictograms', action.payload.locale, idPictogram], newPictogram)
    case PICTOGRAM.FAILURE:
      return state
        .set('error', action.payload.error)
        .set('loading', false)
    case PICTOGRAMS.REQUEST:
      return state
        .set('loading', true)
        .set('error', false)
    case PICTOGRAMS.SUCCESS:
      newPictogram = fromJS(action.payload.data.entities.pictograms || {})
      return state
        .set('loading', false)
        .setIn(['search', action.payload.locale, action.payload.searchText], action.payload.data.result)
        .mergeIn(['pictograms', action.payload.locale], newPictogram)
    case PICTOGRAMS.FAILURE:
      return state
        .set('error', action.payload.error)
        .set('loading', false)
    case NEW_PICTOGRAMS.REQUEST:
      return state
        .set('loading', true)
        .set('error', false)
    case NEW_PICTOGRAMS.SUCCESS:
      newPictogram = fromJS(action.payload.data.entities.pictograms || {})
      return state
        .set('loading', false)
        .set('newPictograms', action.payload.data.result)
        .mergeIn(['pictograms', action.payload.locale], newPictogram)
    case NEW_PICTOGRAMS.FAILURE:
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
        .set('error', action.payload.error)
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

export default pictogramsViewReducer
