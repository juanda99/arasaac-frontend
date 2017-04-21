import registerViewReducer, { initialState } from '../reducer'

describe('registerViewReducer', () => {
  it('returns the initial state', () => {
    expect(registerViewReducer(undefined, {})).toEqual(initialState)
  })
})
