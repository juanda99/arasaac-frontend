/*
 *
 * PictogramsView actions
 *
 */

import { createRequestTypes, action } from 'utils/actions'

// constants
export const MATERIALS = createRequestTypes('app/MaterialsView/MATERIALS')
export const SHOW_FILTERS = 'app/MaterialsView/SHOW_FILTERS'
export const ENABLE_FILTER = 'app/MaterialsView/ENABLE_FILTER'
export const ADD_FILTER = 'app/MaterialsView/ADD_FILTER'
export const REMOVE_FILTER = 'app/MaterialsView/REMOVE_FILTER'


// actions: pictograms.request/success/failure

export const materials = {
  request: (locale, searchText) => action(MATERIALS.REQUEST, { locale, searchText }),
  success: (locale, searchText, data) => action(MATERIALS.SUCCESS, { locale, searchText, data }),
  failure: (error) => action(MATERIALS.FAILURE, { error })
}

export const toggleShowFilter = () => action(SHOW_FILTERS)

// we don't use this action right now, maybe if we decide to show only some filters... mobile version?
export const enableFilter = (field, value) => action(ENABLE_FILTER, { field, value })

export const addFilter = (type, value) => action(ADD_FILTER, { type, value })

export const removeFilter = (type, value) => action(REMOVE_FILTER, { type, value })
