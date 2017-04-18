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
      const token = 'token'
      const expectedResult = {
        type: LOGIN.SUCCESS,
        username,
        token
      }
      expect(login.success(username, token)).toEqual(expectedResult)
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

  describe('Activaction request', () => {
    it('should return the correct type and  props', () => {
      const profile = {}
      const expectedResult = {
        type: ACTIVATION.REQUEST,
        profile
      }
      expect(activation.request(profile)).toEqual(expectedResult)
    })
  })
  describe('Activaction success', () => {
    it('should return the correct type and props', () => {
      const expectedResult = {
        type: ACTIVATION.SUCCESS
      }
      expect(activation.success()).toEqual(expectedResult)
    })
  })
  describe('Activaction failure', () => {
    it('should return the correct type and props', () => {
      const error = 'Test error'
      const expectedResult = {
        type: ACTIVATION.FAILURE,
        error
      }
      expect(activation.failure(error)).toEqual(expectedResult)
    })
  })

  describe('Logout request', () => {
    it('should return the correct type and  props', () => {
      const expectedResult = {
        type: LOGOUT.REQUEST
      }
      expect(logout.request()).toEqual(expectedResult)
    })
  })
  describe('Logout success', () => {
    it('should return the correct type and props', () => {
      const username = 'testUser'
      const password = 'password'
      const expectedResult = {
        type: LOGOUT.SUCCESS
      }
      expect(logout.success(username, password)).toEqual(expectedResult)
    })
  })
  describe('Logout failure', () => {
    it('should return the correct type and props', () => {
      const error = 'Test error'
      const expectedResult = {
        type: LOGOUT.FAILURE,
        error
      }
      expect(logout.failure(error)).toEqual(expectedResult)
    })
  })
})
