import { TOGGLE_FILTER, toggleFilter } from '../actions'


describe('ToggleFilter action', () => {
  it('Should return the correct type', () => {
    const filter = 'catalog'
    const expectedResult = {
      type: TOGGLE_FILTER,
      filter
    }
    expect(toggleFilter(filter)).toEqual(expectedResult)
  })
})
