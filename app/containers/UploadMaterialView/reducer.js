/*
 *
 * Materials View reducer
 *
 */

import { fromJS, List } from 'immutable'
import { UPLOAD_MATERIAL } from './actions'

export const initialState = fromJS({
  loading: false,
  error: false
})

function uploadMaterialReducer(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_MATERIAL.REQUEST:
      return state
        .set('loading', true)
        .set('error', false)
    case UPLOAD_MATERIAL.SUCCESS:
      return state
        .set('loading', false)
    case UPLOAD_MATERIAL.FAILURE:
      return state
        .set('error', action.payload.error)
        .set('loading', false)
    default:
      return state
  }
}

export default uploadMaterialReducer
