import expect from 'expect'
import { fromJS } from 'immutable'
import pictogramsViewReducer from '../reducer'
import { pictograms } from '../actions'

describe('pictogramsViewReducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      showFilter: false,
      loading: false,
      error: false,
      search: fromJS({})
    })
  })

  it('should handle the pictograms.failure action correctly', () => {
    const error = 'test error'
    const payload = { error }
    const expectedResult = state
      .set('error', payload.error)
      .set('loading', false)

    expect(pictogramsViewReducer(state, pictograms.failure(error))).toEqual(expectedResult)
  })

  it('should return the initial state', () => {
    const expectedResult = state
    expect(pictogramsViewReducer(undefined, {})).toEqual(expectedResult)
  })

  it('should handle the pictograms.request action correctly', () => {
    const expectedResult = state
      .set('loading', true)
      .set('error', false)
    expect(pictogramsViewReducer(state, pictograms.request())).toEqual(expectedResult)
  })

  it('should handle the pictograms.success action correctly', () => {
    const searchText = 'test'
    const data = 'Data for test'
    const expectedResult = fromJS({
      showFilter: false,
      loading: false,
      error: false,
      search: fromJS({ test: data })
    })
    expect(pictogramsViewReducer(state, pictograms.success(searchText, data))).toEqual(expectedResult)
  })
})
