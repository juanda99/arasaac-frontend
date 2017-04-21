import toggleFilterReducer, { initialState } from '../reducer'

describe('toggleFilterReducer', () => {
  it('returns the initial state', () => {
    expect(toggleFilterReducer(undefined, {})).toEqual(initialState)
  })
})
