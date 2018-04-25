/*
 *
 * PictogramView actions
 *
 */

import { createRequestTypes, action } from 'utils/actions'

// constants
export const PICTOGRAM = createRequestTypes('PICTOGRAM')

// actions: material.request/success/failure
export const pictogram = {
  request: (idPictogram) => action(PICTOGRAM.REQUEST, { idPictogram }),
  success: (data) => action(PICTOGRAM.SUCCESS, { data }),
  failure: (error) => action(PICTOGRAM.FAILURE, { error })
}
