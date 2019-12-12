/*
 *
 * PictogramsView reducer
 *
 */

import { fromJS } from 'immutable'
import { DEFAULT_LIST } from 'utils'
import { FAVORITE_LIST_SELECT } from './actions'

export const initialState = fromJS({
  favoriteList: DEFAULT_LIST
})

function favoritesViewReducer(state = initialState, action) {
  switch (action.type) {
    case FAVORITE_LIST_SELECT:
      return state.set('favoriteList', action.payload.listName)
    default:
      return state
  }
}

export default favoritesViewReducer
