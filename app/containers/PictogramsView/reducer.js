/*
 *
 * PictogramsView reducer
 *
 */

import { fromJS } from 'immutable'
import { PICTOGRAMS } from './actions'

const initialState = fromJS({})

function pictogramsViewReducer(state = initialState, action) {
  let nextState
  switch (action.type) {
    case PICTOGRAMS.REQUEST:
      return state
    case PICTOGRAMS.SUCCESS:
      nextState = state.setIn([action.searchText], action.response.data)
      return nextState
    case PICTOGRAMS.FAILURE:
      nextState = state.setIn([action.searchText], action.response.data)
      return nextState
    default:
      return state
  }
}

export default pictogramsViewReducer
