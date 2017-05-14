/*
 *
 * PictogramsView actions
 *
 */

import { createRequestTypes, action } from 'utils/actions'

// constants
export const MATERIAL = createRequestTypes('app/MaterialView/MATERIAL')
export const MATERIALS = createRequestTypes('app/MaterialsView/MATERIALS')
export const SHOW_FILTERS = 'app/MaterialsView/SHOW_FILTERS'
export const ENABLE_FILTER = 'app/MaterialsView/ENABLE_FILTER'
export const SET_FILTER_ITEMS = 'app/MaterialsView/SET_FILTER_ITEMS'

// actions: material.request/success/failure
export const material = {
  request: (idMaterial) => action(MATERIAL.REQUEST, { idMaterial }),
  success: () => action(MATERIAL.SUCCESS, { }),
  failure: (error) => action(MATERIAL.FAILURE, { error })
}

// actions: materials.request/success/failure
export const materials = {
  request: (locale, searchText) => action(MATERIALS.REQUEST, { locale, searchText }),
  success: (locale, searchText, data) => action(MATERIALS.SUCCESS, { locale, searchText, data }),
  failure: (error) => action(MATERIALS.FAILURE, { error })
}

export const toggleShowFilter = () => action(SHOW_FILTERS)

// we don't use this action right now, maybe if we decide to show only some filters... mobile version?
export const enableFilter = (field, value) => action(ENABLE_FILTER, { field, value })

export const setFilterItems = (filter, values) => action(SET_FILTER_ITEMS, { filter, values })
