/*
 *
 * PictogramsView actions
 *
 */

import { createRequestTypes, action } from 'utils/actions'

// constants
export const PICTOGRAMS = createRequestTypes('PICTOGRAMS')
export const CATEGORIES = createRequestTypes('CATEGORIES')
export const FAVORITE_PICTOGRAMS = createRequestTypes('FAVORITE_PICTOGRAMS')
export const NEW_PICTOGRAMS = createRequestTypes('NEW_PICTOGRAMS')
export const SHOW_FILTERS = 'PICTOGRAMS_SHOW_FILTERS'
export const ENABLE_FILTER = 'PICTOGRAMS_ENABLE_FILTER'
export const SET_FILTER_ITEMS = 'PICTOGRAMS_SET_FILTER_ITEMS'
export const AUTOCOMPLETE = createRequestTypes('AUTOCOMPLETE')
export const FAVORITE_LIST_SELECT = 'FAVORITE_LIST_SELECT'

export const TOGGLE_FILTERS = 'PICTOGRAMS_TOGGLE_FILTERS'
export const TOGGLE_SETTINGS = 'PICTOGRAMS_TOGGLE_SETTINGS'

export const pictograms = {
  request: (locale, searchText) =>
    action(PICTOGRAMS.REQUEST, { locale, searchText }),
  success: (locale, searchText, data) =>
    action(PICTOGRAMS.SUCCESS, { locale, searchText, data }),
  failure: (error) => action(PICTOGRAMS.FAILURE, { error })
}

export const categories = {
  request: (locale) =>
    action(CATEGORIES.REQUEST, { locale }),
  success: (locale, data) =>
    action(CATEGORIES.SUCCESS, { locale, data }),
  failure: (error) => action(CATEGORIES.FAILURE, { error })
}

export const favoriteListSelect = (listName) =>
  action(FAVORITE_LIST_SELECT, { listName })

export const favoritePictograms = {
  request: (locale, favoriteIds, token) =>
    action(FAVORITE_PICTOGRAMS.REQUEST, { locale, favoriteIds, token }),
  success: (locale, data) =>
    action(FAVORITE_PICTOGRAMS.SUCCESS, { locale, data }),
  failure: (error) => action(FAVORITE_PICTOGRAMS.FAILURE, { error })
}

export const newPictograms = {
  request: (locale) => action(NEW_PICTOGRAMS.REQUEST, { locale }),
  success: (locale, data) => action(NEW_PICTOGRAMS.SUCCESS, { locale, data }),
  failure: (error) => action(NEW_PICTOGRAMS.FAILURE, { error })
}

export const autocomplete = {
  request: (locale) => action(AUTOCOMPLETE.REQUEST, { locale }),
  success: (locale, data) => action(AUTOCOMPLETE.SUCCESS, { locale, data }),
  failure: (error) => action(AUTOCOMPLETE.FAILURE, { error })
}

export const toggleShowFilter = () => action(TOGGLE_FILTERS)
export const toggleShowSettings = () => action(TOGGLE_SETTINGS)

// we don't use this action right now, maybe if we decide to show only some filters... mobile version?
// export const enableFilter = (field, value) =>
//   action(ENABLE_FILTER, { field, value })

export const setFilterItems = (filter, values) =>
  action(SET_FILTER_ITEMS, { filter, values })
