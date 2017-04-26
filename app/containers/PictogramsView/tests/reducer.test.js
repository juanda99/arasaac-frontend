import { fromJS } from 'immutable'
import pictogramsViewReducer, { initialState } from '../reducer'
import { pictograms, toggleShowFilter } from '../actions'

describe('pictogramsViewReducer', () => {
  let state
  beforeEach(() => {
    state = initialState
  })

  it('should return the initial state', () => {
    expect(pictogramsViewReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle the showFilter action correcty', () => {
    const expectedResult = state
      .set('showFilter', true)
      .set('loading', false)
    expect(pictogramsViewReducer(state, toggleShowFilter())).toEqual(expectedResult)
  })

  it('should handle the showFilter action correcty: hide filters', () => {
    const testState = fromJS({ showFilter: true })
    const expectedResult = fromJS({ showFilter: false })
    expect(pictogramsViewReducer(testState, toggleShowFilter())).toEqual(expectedResult)
  })

  it('should handle the pictograms.request action correctly', () => {
    const searchText = 'test'
    const expectedResult = state
      .set('loading', true)
      .set('error', false)
      .set('searchText', searchText)
    expect(pictogramsViewReducer(state, pictograms.request(searchText))).toEqual(expectedResult)
  })


  it('should handle the pictograms.failure action correctly', () => {
    const error = 'test error'
    const payload = { error }
    const expectedResult = state
      .set('error', payload.error)
      .set('loading', false)

    expect(pictogramsViewReducer(state, pictograms.failure(error))).toEqual(expectedResult)
  })

  it('should handle the pictograms.success action correctly', () => {
    const searchText = 'test'
    const data = 'Data for test'
    const expectedResult = fromJS({
      showFilter: false,
      loading: false,
      error: false,
      search: fromJS({ test: data }),
      words: {},
      searchText: ''
    })
    expect(pictogramsViewReducer(state, pictograms.success(searchText, data))).toEqual(expectedResult)
  })
})
