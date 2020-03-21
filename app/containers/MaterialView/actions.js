/*
 *
 * MaterialView actions
 *
 */

import { createRequestTypes, action } from 'utils/actions'

// constants
export const MATERIAL = createRequestTypes('MATERIAL')
export const MATERIAL_UPDATE = createRequestTypes('MATERIAL_UPDATE')

// actions: material.request/success/failure
export const material = {
  request: (idMaterial) => action(MATERIAL.REQUEST, { idMaterial }),
  success: (data) => action(MATERIAL.SUCCESS, { data }),
  failure: (error) => action(MATERIAL.FAILURE, { error })
}

export const updateMaterial = {
  request: (id, data, token) => action(MATERIAL_UPDATE.REQUEST, { id, data, token }),
  success: (data) => action(MATERIAL_UPDATE.SUCCESS, { data }),
  failure: (error) => action(MATERIAL_UPDATE.FAILURE, { error })
}