/*
 *
 * MaterialsView actions
 *
 */

import { createRequestTypes, action } from 'utils/actions'

// constants
export const MATERIALS = createRequestTypes('MATERIALS')
export const NEW_MATERIALS = createRequestTypes('NEW_MATERIALS')
export const MATERIAL_PUBLISH = createRequestTypes('MATERIAL_PUBLISH')
export const SHOW_FILTERS = 'MATERIALS_SHOW_FILTERS'
export const ENABLE_FILTER = 'MATERIALS_ENABLE_FILTER'
export const SET_FILTER_ITEMS = 'MATERIALS_SET_FILTER_ITEMS'


// actions: materials.request/success/failure
export const materials = {
  request: (locale, searchText, token) => action(MATERIALS.REQUEST, { locale, searchText, token }),
  success: (locale, searchText, data) => action(MATERIALS.SUCCESS, { locale, searchText, data }),
  failure: (error) => action(MATERIALS.FAILURE, { error })
}

export const newMaterials = {
  request: (token) => action(NEW_MATERIALS.REQUEST, { token }),
  success: (data) => action(NEW_MATERIALS.SUCCESS, { data }),
  failure: (error) => action(NEW_MATERIALS.FAILURE, { error })
}

export const publishMaterial = {
  request: (id, status, token) => action(MATERIAL_PUBLISH.REQUEST, { id, status, token }),
  success: (data) => action(MATERIAL_PUBLISH.SUCCESS, { data }),
  failure: (error) => action(MATERIAL_PUBLISH.FAILURE, { error })
}

export const toggleShowFilter = () => action(SHOW_FILTERS)

// we don't use this action right now, maybe if we decide to show only some filters... mobile version?
export const enableFilter = (field, value) => action(ENABLE_FILTER, { field, value })

export const setFilterItems = (filter, values) => action(SET_FILTER_ITEMS, { filter, values })
