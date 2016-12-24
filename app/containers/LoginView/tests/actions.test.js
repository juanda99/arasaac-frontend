import expect from 'expect'

import { LOGIN, LOGOUT, ACTIVATION, login, logout, activation } from '../actions'

describe('Authentication actions', () => {
  describe('Login request', () => {
    it('should return the correct type and  props', () => {
      const username = 'testUser'
      const password = 'password'
      const expectedResult = {
        type: LOGIN.REQUEST,
        username,
        password
      }
      expect(login.request(username, password)).toEqual(expectedResult)
    })
  })
  describe('Login success', () => {
    it('should return the correct type and props', () => {
      const username = 'testUser'
      const password = 'password'
      const expectedResult = {
        type: LOGIN.SUCCESS,
        username,
        password
      }
      expect(login.success(username, password)).toEqual(expectedResult)
    })
  })
  describe('Login failure', () => {
    it('should return the correct type and props', () => {
      const error = 'Test error'
      const expectedResult = {
        type: LOGIN.FAILURE,
        error
      }
      expect(login.failure(error)).toEqual(expectedResult)
    })
  })
})

