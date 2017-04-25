/*
 *
 * ToggleFilter reducer
 *
 */

import { fromJS } from 'immutable'
import { TOGGLE_FILTER } from './actions'

export const initialState = fromJS({
  catalog: true,
  license: true,
  size: true
})


function toggleFilterReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_FILTER:
      return state
        .set(action.payload.filter, !state.get(action.payload.filter))
    default:
      return state
  }
}

export default toggleFilterReducer
