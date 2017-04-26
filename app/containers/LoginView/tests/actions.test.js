import { LOGIN, LOGOUT, ACTIVATION, login, logout, activation } from '../actions'

describe('Authentication actions', () => {
  describe('Login request', () => {
    it('should return the correct type and  props', () => {
      const username = 'testUser'
      const password = 'password'
      const expectedResult = {
        type: LOGIN.REQUEST,
        payload: { username, password }
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
        payload: { username, token }
      }
      expect(login.success(username, token)).toEqual(expectedResult)
    })
  })
  describe('Login failure', () => {
    it('should return the correct type and props', () => {
      const error = 'Test error'
      const expectedResult = {
        type: LOGIN.FAILURE,
        payload: { error }
      }
      expect(login.failure(error)).toEqual(expectedResult)
    })
  })

  describe('Activaction request', () => {
    it('should return the correct type and  props', () => {
      const profile = {}
      const expectedResult = {
        type: ACTIVATION.REQUEST,
        payload: { profile }
      }
      expect(activation.request(profile)).toEqual(expectedResult)
    })
  })
  describe('Activaction success', () => {
    it('should return the correct type and props', () => {
      const expectedResult = {
        type: ACTIVATION.SUCCESS,
        payload: {}
      }
      expect(activation.success()).toEqual(expectedResult)
    })
  })
  describe('Activaction failure', () => {
    it('should return the correct type and props', () => {
      const error = 'Test error'
      const expectedResult = {
        type: ACTIVATION.FAILURE,
        payload: { error }
      }
      expect(activation.failure(error)).toEqual(expectedResult)
    })
  })

  describe('Logout request', () => {
    it('should return the correct type and  props', () => {
      const expectedResult = {
        type: LOGOUT.REQUEST,
        payload: {}
      }
      expect(logout.request()).toEqual(expectedResult)
    })
  })
  describe('Logout success', () => {
    it('should return the correct type and props', () => {
      const username = 'testUser'
      const password = 'password'
      const expectedResult = {
        type: LOGOUT.SUCCESS,
        payload: {}
      }
      expect(logout.success(username, password)).toEqual(expectedResult)
    })
  })
  describe('Logout failure', () => {
    it('should return the correct type and props', () => {
      const error = 'Test error'
      const expectedResult = {
        type: LOGOUT.FAILURE,
        payload: { error }
      }
      expect(logout.failure(error)).toEqual(expectedResult)
    })
  })
})
