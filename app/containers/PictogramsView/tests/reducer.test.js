import expect from 'expect'
import { fromJS } from 'immutable'
import pictogramsViewReducer from '../reducer'

describe('pictogramsViewReducer', () => {
  it('returns the initial state', () => {
    expect(pictogramsViewReducer(undefined, {})).toEqual(fromJS({}))
  })
})
