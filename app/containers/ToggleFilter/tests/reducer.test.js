import { fromJS } from 'immutable'
import toggleFilterReducer from '../reducer'

describe('toggleFilterReducer', () => {
  it('returns the initial state', () => {
    expect(toggleFilterReducer(undefined, {})).toEqual(fromJS({}))
  })
})
