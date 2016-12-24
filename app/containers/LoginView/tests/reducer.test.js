import expect from 'expect'
import loginViewReducer from '../reducer'
import { fromJS } from 'immutable'

describe('loginViewReducer', () => {
  it('returns the initial state', () => {
    expect(loginViewReducer(undefined, {})).toEqual(fromJS({}))
  })
})
