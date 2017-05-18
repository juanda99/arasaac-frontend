/*
 *
 * MaterialView actions
 *
 */

import { createRequestTypes, action } from 'utils/actions'

// constants
export const MATERIAL = createRequestTypes('app/MaterialView/MATERIAL')

// actions: material.request/success/failure
export const material = {
  request: (idMaterial) => action(MATERIAL.REQUEST, { idMaterial }),
  success: (data) => action(MATERIAL.SUCCESS, { data }),
  failure: (error) => action(MATERIAL.FAILURE, { error })
}
