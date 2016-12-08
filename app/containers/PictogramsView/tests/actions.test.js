import expect from 'expect'

import { SHOW_FILTERS, toggleShowFilter, PICTOGRAMS, pictograms } from '../actions'

describe('PictogramsView actions', () => {
  describe('Show filters', () => {
    it('should return de correct type', () => {
      const expected = {
        type: SHOW_FILTERS
      }
      expect(toggleShowFilter()).toEqual(expected)
    })
  })

  describe('Pictograms requests', () => {
    it('should return the correct type and the passed repos', () => {
      const searchText = 'Test'
      const expectedResult = {
        type: PICTOGRAMS.REQUEST,
        searchText
      }
      expect(pictograms.request(searchText)).toEqual(expectedResult)
    })
  })
  describe('Pictograms success', () => {
    it('should return the correct type and the passed repos', () => {
      const searchText = 'Test'
      const data = 'Result data'
      const expectedResult = {
        type: PICTOGRAMS.SUCCESS,
        searchText,
        data
      }
      expect(pictograms.success(searchText, data)).toEqual(expectedResult)
    })
  })
  describe('Pictograms failure', () => {
    it('should return the correct type and the passed repos', () => {
      const error = 'Test error'
      const expectedResult = {
        type: PICTOGRAMS.FAILURE,
        error
      }
      expect(pictograms.failure(error)).toEqual(expectedResult)
    })
  })
})
