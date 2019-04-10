/*
 *
 * LoginView actions
 *
 */

import { createRequestTypes, action } from 'utils/actions'

// constants
export const ACTIVATION = createRequestTypes('ACTIVATION')

export const activation = {
  request: (code) => action(ACTIVATION.REQUEST, { code }),
  success: () => action(ACTIVATION.SUCCESS),
  failure: (error) => action(ACTIVATION.FAILURE, { error })
}
