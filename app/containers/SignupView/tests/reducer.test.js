import { fromJS } from 'immutable'
import registerViewReducer from '../reducer'

describe('registerViewReducer', () => {
  it('returns the initial state', () => {
    expect(registerViewReducer(undefined, {})).toEqual(fromJS({}))
  })
})
