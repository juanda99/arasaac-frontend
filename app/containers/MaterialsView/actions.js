/*
 *
 * PictogramsView actions
 *
 */

import { createRequestTypes, action } from 'utils/actions'

// constants
export const PICTOGRAMS = createRequestTypes('app/PictogramsView/PICTOGRAMS')
// export const LOAD_PICTOGRAMS = 'app/PictogramsView/LOAD_PICTOGRAMS'

export const AUTOCOMPLETE = createRequestTypes('app/PictogramsView/AUTOCOMPLETE')
// export const LOAD_AUTOCOMPLETE = 'app/PictogramsView/LOAD_AUTOCOMPLETE'

export const SHOW_FILTERS = 'app/PictogramsView/SHOW_FILTERS'

// actions: pictograms.request/success/failure

export const pictograms = {
  request: (searchText) => action(PICTOGRAMS.REQUEST, { searchText }),
  success: (searchText, data) => action(PICTOGRAMS.SUCCESS, { searchText, data }),
  failure: (error) => action(PICTOGRAMS.FAILURE, { error })
}

export const autocomplete = {
  request: (searchText) => action(AUTOCOMPLETE.REQUEST, { searchText }),
  success: (searchText, data) => action(AUTOCOMPLETE.SUCCESS, { searchText, data }),
  failure: (error) => action(AUTOCOMPLETE.FAILURE, { error })
}

// export const loadPictograms = (searchText) => action(LOAD_PICTOGRAMS, { searchText })
// export const loadAutocomplete = (searchText) => action(LOAD_AUTOCOMPLETE, { searchText })

export const toggleShowFilter = () => action(SHOW_FILTERS)
