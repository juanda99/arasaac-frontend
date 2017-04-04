import expect from 'expect'

import { SHOW_FILTERS, PICTOGRAMS, AUTOCOMPLETE, toggleShowFilter, pictograms, autocomplete } from '../actions'

describe('PictogramsView actions', () => {
  describe('Show filters', () => {
    it('should return de correct type', () => {
      const expected = {
        type: SHOW_FILTERS
      }
      expect(toggleShowFilter()).toEqual(expected)
    })
  })

  describe('Pictograms request', () => {
    it('should return the correct type and  props', () => {
      const searchText = 'Test'
      const expectedResult = {
        type: PICTOGRAMS.REQUEST,
        searchText
      }
      expect(pictograms.request(searchText)).toEqual(expectedResult)
    })
  })
  describe('Pictograms success', () => {
    it('should return the correct type and props', () => {
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
    it('should return the correct type and props', () => {
      const error = 'Test error'
      const expectedResult = {
        type: PICTOGRAMS.FAILURE,
        error
      }
      expect(pictograms.failure(error)).toEqual(expectedResult)
    })
  })
  describe('Autocomplete request', () => {
    it('should return the correct type and repos', () => {
      const searchText = 'Test'
      const expectedResult = {
        type: AUTOCOMPLETE.REQUEST,
        searchText
      }
      expect(autocomplete.request(searchText)).toEqual(expectedResult)
    })
  })
  describe('Autocomplete success', () => {
    it('should return the correct type and props', () => {
      const searchText = 'Test'
      const data = 'Result data'
      const expectedResult = {
        type: AUTOCOMPLETE.SUCCESS,
        searchText,
        data
      }
      expect(autocomplete.success(searchText, data)).toEqual(expectedResult)
    })
  })
  describe('Autocomplete failure', () => {
    it('should return the correct type and props', () => {
      const error = 'Test error'
      const expectedResult = {
        type: AUTOCOMPLETE.FAILURE,
        error
      }
      expect(autocomplete.failure(error)).toEqual(expectedResult)
    })
  })
})
