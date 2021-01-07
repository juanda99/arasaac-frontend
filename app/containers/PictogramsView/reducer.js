/*
 *
 * PictogramsView reducer
 *
 */

import { fromJS, Map } from 'immutable'
import { PICTOGRAM } from 'containers/PictogramView/actions'
import languages from 'data/languages'
import { DEFAULT_LIST } from 'utils'
import {
  PICTOGRAMS,
  CATEGORIES,
  NEW_PICTOGRAMS,
  AUTOCOMPLETE,
  TOGGLE_FILTERS,
  TOGGLE_SETTINGS,
  // SHOW_FILTERS,
  // SET_FILTER_ITEMS,
  FAVORITE_LIST_SELECT,
  FAVORITE_PICTOGRAMS,
  SET_SEARCH_LANGUAGE
} from './actions'


const pictograms = {}
languages.forEach(language => {
  pictograms[language.code] = {}
})

const categories = {}
languages.forEach(language => {
  categories[language.code] = {}
})

export const initialState = fromJS({
  showFilter: false,
  showSettings: false,
  loading: false,
  loadingNew: false,
  error: false,
  errorNew: false,
  errorCategories: false,
  loadingCategories: false,
  search: {},
  words: {},
  favoriteList: DEFAULT_LIST,
  searchText: '',
  searchLanguage: null,
  pictograms,
  categories,
  newPictograms: []
})

function pictogramsViewReducer(state = initialState, action) {
  let newPictogram = {}
  let idPictogram
  switch (action.type) {
    case PICTOGRAM.REQUEST:
      return state.set('loading', true).set('error', false)
    case PICTOGRAM.SUCCESS:
      newPictogram = fromJS(action.payload.data || {})
      idPictogram = action.payload.data._id.toString()
      return state
        .set('loading', false)
        .setIn(
          ['pictograms', action.payload.locale, idPictogram],
          newPictogram
        )

    case PICTOGRAM.FAILURE:
    case PICTOGRAMS.FAILURE:
      return state.set('error', action.payload.error).set('loading', false)

    case NEW_PICTOGRAMS.FAILURE:
      return state.set('errorNew', action.payload.error).set('loadingNew', false)

    case PICTOGRAMS.REQUEST:
    case FAVORITE_PICTOGRAMS.REQUEST:
      return state.set('loading', true).set('error', false)

    case NEW_PICTOGRAMS.REQUEST:
      return state.set('loadingNew', true).set('errorNew', false)

    case SET_SEARCH_LANGUAGE:
      return state.set('searchLanguage', action.payload.locale)

    case PICTOGRAMS.SUCCESS:
      newPictogram = fromJS(action.payload.data.entities.pictograms || {})
      return state
        .set('loading', false)
        .setIn(
          ['search', action.payload.locale, decodeURIComponent(action.payload.searchText)],
          action.payload.data.result
        )
        .mergeIn(['pictograms', action.payload.locale], newPictogram)

    case NEW_PICTOGRAMS.SUCCESS:
      newPictogram = fromJS(action.payload.data.entities.pictograms || {})
      return state
        .set('loadingNew', false)
        .set('newPictograms', action.payload.data.result)
        .mergeIn(['pictograms', action.payload.locale], newPictogram)

    case FAVORITE_PICTOGRAMS.SUCCESS:
      newPictogram = fromJS(action.payload.data.entities.pictograms || {})
      return state
        .set('loading', false)
        .mergeIn(['pictograms', action.payload.locale], newPictogram)
    
    case CATEGORIES.REQUEST:
      return state.set('loadingCategories', true).set('errorCategories', false)
    case CATEGORIES.FAILURE:
      return state.set('errorCategories', action.payload.error).set('loadingCategories', false)
    case CATEGORIES.SUCCESS:
      {
      const categories = Map(action.payload.data.data || {})
      return state
        .set('loadingNew', false)
        .setIn(['categories', action.payload.locale], categories)
      }
    case AUTOCOMPLETE.REQUEST:
      return state
    case AUTOCOMPLETE.SUCCESS:
      return state.setIn(['words', action.payload.locale], action.payload.data)
    case AUTOCOMPLETE.FAILURE:
      return state.set('error', action.payload.error)
    case TOGGLE_FILTERS:
      return state
        .set('showFilter', !state.get('showFilter'))
        .set('showSettings', false)
    case TOGGLE_SETTINGS:
      return state
        .set('showSettings', !state.get('showSettings'))
        .set('showFilter', false)
    // case SHOW_FILTERS:
    //   return state.set('showFilter', !state.get('showFilter'))
    // case SET_FILTER_ITEMS:
    //   return state.setIn(
    //     ['filters', action.payload.filter],
    //     action.payload.values
    //   )
    case FAVORITE_LIST_SELECT:
      return state.set('favoriteList', action.payload.listName)
    default:
      return state
  }
}

export default pictogramsViewReducer
