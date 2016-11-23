/*
 *
 * PictogramsView actions
 *
 */

import { createRequestTypes, action } from 'utils/actions'

// constants
export const PICTOGRAMS = createRequestTypes('app/PictogramsView/PICTOGRAMS')
// console.log('*********************************')
// console.log (PICTOGRAMS)
export const LOAD_PICTOGRAMS = 'app/PictogramsView/PICTOGRAMS_LOAD'
// import { action } from 'utils/actions'
// import { PICTOGRAMS } from './constants'

// actions: pictograms.request/success/failure

export const pictograms = {
  request: (searchText) => action(PICTOGRAMS.REQUEST, { searchText }),
  success: (searchText, data) => action(PICTOGRAMS.SUCCESS, { searchText, data }),
  failure: (error) => action(PICTOGRAMS.FAILURE, { error })
}

export const loadPictograms = (searchText) => action(LOAD_PICTOGRAMS, { searchText })
