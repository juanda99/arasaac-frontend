import expect from 'expect'
import pictogramsViewReducer from '../reducer'
import { fromJS } from 'immutable'

describe('pictogramsViewReducer', () => {
  it('returns the initial state', () => {
    expect(pictogramsViewReducer(undefined, {})).toEqual(fromJS({}))
  })
})
