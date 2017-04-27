/*
 *
 * PictogramsView actions
 *
 */

import { createRequestTypes, action } from 'utils/actions'

// constants
export const MATERIALS = createRequestTypes('app/MaterialsView/MATERIALS')
export const SHOW_FILTERS = 'app/MaterialsView/SHOW_FILTERS'

// actions: pictograms.request/success/failure

export const materials = {
  request: (searchText) => action(MATERIALS.REQUEST, { searchText }),
  success: (searchText, data) => action(MATERIALS.SUCCESS, { searchText, data }),
  failure: (error) => action(MATERIALS.FAILURE, { error })
}

export const toggleShowFilter = () => action(SHOW_FILTERS)
