/*
 *
 * MaterialsView actions
 *
 */

import { createRequestTypes, action } from 'utils/actions'

// constants
export const MATERIALS = createRequestTypes('MATERIALS')
export const MATERIALS_NOT_PUBLISHED = createRequestTypes(
  'MATERIALS_NOT_PUBLISHED'
)
export const NEW_MATERIALS = createRequestTypes('NEW_MATERIALS')
export const AUTHORS = createRequestTypes('AUTHORS')
export const MATERIAL_PUBLISH = createRequestTypes('MATERIAL_PUBLISH')
export const MATERIAL_REMOVE = createRequestTypes('MATERIAL_REMOVE')
export const MATERIAL = createRequestTypes('MATERIAL')
export const MATERIAL_UPDATE = createRequestTypes('MATERIAL_UPDATE')

export const SET_FILTER_ITEMS = 'MATERIALS_SET_FILTER_ITEMS'

// actions: materials.request/success/failure
export const materials = {
  request: (locale, searchText, searchType, token) =>
    action(MATERIALS.REQUEST, { locale, searchText, searchType, token }),
  success: (locale, searchText, searchType, data) =>
    action(MATERIALS.SUCCESS, { locale, searchText, searchType, data }),
  failure: (error) => action(MATERIALS.FAILURE, { error }),
}

export const newMaterials = {
  request: (numItems, token) =>
    action(NEW_MATERIALS.REQUEST, { numItems, token }),
  success: (data) => action(NEW_MATERIALS.SUCCESS, { data }),
  failure: (error) => action(NEW_MATERIALS.FAILURE, { error }),
}

export const authors = {
  request: () => action(AUTHORS.REQUEST),
  success: (data) => action(AUTHORS.SUCCESS, { data }),
  failure: (error) => action(AUTHORS.FAILURE, { error }),
}

export const publishMaterial = {
  request: (id, status, token) =>
    action(MATERIAL_PUBLISH.REQUEST, { id, status, token }),
  success: (data) => action(MATERIAL_PUBLISH.SUCCESS, { data }),
  failure: (error) => action(MATERIAL_PUBLISH.FAILURE, { error }),
}

export const notPublishedMaterials = {
  request: (token) => action(MATERIALS_NOT_PUBLISHED.REQUEST, { token }),
  success: (data) => action(MATERIALS_NOT_PUBLISHED.SUCCESS, { data }),
  failure: (error) => action(MATERIALS_NOT_PUBLISHED.FAILURE, { error }),
}

export const removeMaterial = {
  request: (id, token) => action(MATERIAL_REMOVE.REQUEST, { id, token }),
  success: (data) => action(MATERIAL_REMOVE.SUCCESS, { data }),
  failure: (error) => action(MATERIAL_REMOVE.FAILURE, { error }),
}

export const material = {
  request: (idMaterial, token) =>
    action(MATERIAL.REQUEST, { idMaterial, token }),
  success: (data) => action(MATERIAL.SUCCESS, { data }),
  failure: (error) => action(MATERIAL.FAILURE, { error }),
}

export const updateMaterial = {
  request: (id, data, token) =>
    action(MATERIAL_UPDATE.REQUEST, { id, data, token }),
  success: (data) => action(MATERIAL_UPDATE.SUCCESS, { data }),
  failure: (error) => action(MATERIAL_UPDATE.FAILURE, { error }),
}

export const setFilterItems = (filter, values) =>
  action(SET_FILTER_ITEMS, { filter, values })
