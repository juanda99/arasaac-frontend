import { fromJS } from 'immutable'
import activity from 'data/activity'
import area from 'data/area'
import language from 'data/language'
import license from 'data/license'
import size from 'data/size'

export const initialState = fromJS({
  activity,
  area,
  language,
  license,
  size
})

function activityReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}

export default activityReducer
