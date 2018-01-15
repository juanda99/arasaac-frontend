/*
 *
 * MaterialsView actions
 *
 */

import { createRequestTypes, action } from 'utils/actions'

// constants
export const MATERIALS = createRequestTypes('app/MaterialsView/MATERIALS')
export const NEW_MATERIALS = createRequestTypes('app/MaterialsView/NEW_MATERIALS')
export const SHOW_FILTERS = 'app/MaterialsView/SHOW_FILTERS'
export const ENABLE_FILTER = 'app/MaterialsView/ENABLE_FILTER'
export const SET_FILTER_ITEMS = 'app/MaterialsView/SET_FILTER_ITEMS'

// actions: materials.request/success/failure
export const materials = {
  request: (locale, searchText) => action(MATERIALS.REQUEST, { locale, searchText }),
  success: (locale, searchText, data) => action(MATERIALS.SUCCESS, { locale, searchText, data }),
  failure: (error) => action(MATERIALS.FAILURE, { error })
}

export const newMaterials = {
  request: () => action(NEW_MATERIALS.REQUEST),
  success: (data) => action(NEW_MATERIALS.SUCCESS, { data }),
  failure: (error) => action(NEW_MATERIALS.FAILURE, { error })
}

export const toggleShowFilter = () => action(SHOW_FILTERS)

// we don't use this action right now, maybe if we decide to show only some filters... mobile version?
export const enableFilter = (field, value) => action(ENABLE_FILTER, { field, value })

export const setFilterItems = (filter, values) => action(SET_FILTER_ITEMS, { filter, values })
