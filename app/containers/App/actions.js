/*
 *
 * LoginView actions
 *
 */

import { createRequestTypes, action } from 'utils/actions'
import { DEFAULT_LIST } from 'utils'

// constants
export const LOGIN = createRequestTypes('LOGIN')
export const SOCIAL_LOGIN = createRequestTypes('SOCIAL_LOGIN')
export const LOGOUT = 'app/LoginView/LOGOUT'
export const TOKEN_VALIDATION = createRequestTypes('TOKEN_VALIDATION')
export const TOKEN_REFRESH = createRequestTypes('TOKEN_REFRESH')
export const RESET_ERROR = 'app/LoginView/RESET_ERROR'
export const ACTIVATION = createRequestTypes('ACTIVATION')

export const ADD_FAVORITE = createRequestTypes('ADD_FAVORITE')
export const REMOVE_FAVORITE = createRequestTypes('REMOVE_FAVORITE')

export const login = {
  request: (username, password) =>
    action(LOGIN.REQUEST, { username, password }),
  success: (accessToken, refreshToken) =>
    action(LOGIN.SUCCESS, { accessToken, refreshToken }),
  failure: (error) => action(LOGIN.FAILURE, { error })
}

export const socialLogin = {
  request: (socialToken, provider, locale) =>
    action(SOCIAL_LOGIN.REQUEST, { socialToken, provider, locale }),
  success: (accessToken, refreshToken) =>
    action(SOCIAL_LOGIN.SUCCESS, { accessToken, refreshToken }),
  failure: (error) => action(SOCIAL_LOGIN.FAILURE, { error })
}

export const tokenValidation = {
  request: (accessToken) => action(TOKEN_VALIDATION.REQUEST, { accessToken }),
  success: (authData) => action(TOKEN_VALIDATION.SUCCESS, { authData }),
  failure: (error) => action(TOKEN_VALIDATION.FAILURE, { error })
}

export const tokenRefresh = {
  request: (refreshToken) => action(TOKEN_REFRESH.REQUEST, { refreshToken }),
  success: (accessToken) => action(TOKEN_REFRESH.SUCCESS, { accessToken }),
  failure: (error) => action(TOKEN_REFRESH.FAILURE, { error })
}

export const activation = {
  request: (code) => action(ACTIVATION.REQUEST, { code }),
  success: (accessToken) => action(ACTIVATION.SUCCESS, { accessToken }),
  failure: (error) => action(ACTIVATION.FAILURE, { error })
}

export const logout = () => action(LOGOUT)

export const resetError = () => action(RESET_ERROR)

export const addFavorite = {
  request: (fileName, listName = DEFAULT_LIST, token) =>
    action(ADD_FAVORITE.REQUEST, { fileName, listName, token }),
  success: (fileName, listName) =>
    action(ADD_FAVORITE.SUCCESS, { fileName, listName }),
  failure: (error) => action(ADD_FAVORITE, { error })
}

export const removeFavorite = {
  request: (fileName, listName) =>
    action(REMOVE_FAVORITE.REQUEST, { fileName, listName }),
  success: (fileName, listName) =>
    action(REMOVE_FAVORITE.SUCCESS, { fileName, listName }),
  failure: (error) => action(REMOVE_FAVORITE, { error })
}

/* Social login */
/*
export const SOCIAL_LOGIN = 'app/LoginView/SOCIAL_LOGIN'
export const SOCIAL_LOGIN_PREPARE = 'app/LoginView/SOCIAL_LOGIN_PREPARE'
export const SOCIAL_LOGIN_REQUEST = 'app/LoginView/SOCIAL_LOGIN_REQUEST'
export const SOCIAL_LOGIN_SUCCESS = 'app/LoginView/SOCIAL_LOGIN_SUCCESS'
export const SOCIAL_LOGIN_FAILURE = 'app/LoginView/SOCIAL_LOGIN_FAILURE'
export const SOCIAL_LOGOUT = 'app/LoginView/SOCIAL_LOGOUT'


export const socialLogin = {
  prepare: (service, options) => action(SOCIAL_LOGIN_PREPARE, { service, options }),
  request: (service, options) => action(SOCIAL_LOGIN_REQUEST, { service, options }),
  success: (user) => action(SOCIAL_LOGIN_SUCCESS, { user }),
  failure: (error) => action(SOCIAL_LOGIN_FAILURE, { error })
}

export const socialLogout = () => action(SOCIAL_LOGOUT)
*/
