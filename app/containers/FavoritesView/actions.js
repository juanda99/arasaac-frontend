/*
 *
 * PictogramsView actions
 *
 */

import { createRequestTypes, action } from 'utils/actions'

// constants
export const FAVORITE_PICTOGRAMS = createRequestTypes('FAVORITE_PICTOGRAMS')
export const FAVORITE_LIST_SELECT = 'FAVORITE_LIST_SELECT'

export const favoriteListSelect = (listName) =>
  action(FAVORITE_LIST_SELECT, { listName })

export const favoritePictograms = {
  request: (locale, favoriteIds, token) =>
    action(FAVORITE_PICTOGRAMS.REQUEST, { locale, favoriteIds, token }),
  success: (locale, data) =>
    action(FAVORITE_PICTOGRAMS.SUCCESS, { locale, data }),
  failure: (error) => action(FAVORITE_PICTOGRAMS.FAILURE, { error })
}
