/*

export default function* root() {
  // do nothing
}

*/
import { delay } from 'redux-saga'
import {
  call,
  put,
  select,
  take,
  cancel,
  race,
  takeEvery,
  fork,
} from 'redux-saga/effects'

import api from 'services'
import { API_ROOT } from 'services/config'
import callApi from 'services/callApi'
import { push, LOCATION_CHANGE } from 'react-router-redux'
import { REHYDRATE } from 'redux-persist/constants'

// import { authorize, refresh } from './authentication'
import {
  makeSelectTokens,
  makeSelectHasUser,
  makeSelectRefreshing,
} from './selectors'
import {
  TOKEN_VALIDATION,
  TOKEN_REFRESH,
  LOGIN,
  SOCIAL_LOGIN,
  LOGOUT,
  tokenValidation,
  tokenRefresh,
  login,
  logout,
  socialLogin,
} from './actions'

import { changeLocale } from '../LanguageProvider/actions'

/**
 *  The saga flow for authentication. Starts with either a direct login (with
 *  login/password) or a validation from the token stored in the local storage.
 *  Once the authentication is valid, listens for calls to refresh the access token
 *  until the user logs out.
 *  @return  {Generator}
 */
/* eslint no-constant-condition:0 */
function* authFlow() {
  const hasUser = yield select(makeSelectHasUser())
  while (!hasUser) {
    yield call(loggedOutFlowSaga)
  }
  if (hasUser) {
    /* we verify token is recent otherwise we call logout saga */
    /* we get profile data */
    yield call(authenticate)
    yield takeEvery(LOGOUT, logoutSaga)
  }
}

/**
 *  Authentication starts either with classic login or with tokens fetched from
 *  localStorage
 *  @return  {Generator}
 */
function* loggedOutFlowSaga() {
  const { credentials, tokens, socialCredentials } = yield race({
    credentials: take(LOGIN.REQUEST),
    tokens: take(TOKEN_VALIDATION.REQUEST),
    socialCredentials: take(SOCIAL_LOGIN.REQUEST),
  })

  // if (credentials) yield call(loginAuth, credentials.payload.username, credentials.payload.password)
  if (credentials) yield call(loginAuth, credentials.type, credentials.payload)
  else if (tokens) yield call(authenticate)
  else if (socialCredentials) {
    yield call(
      socialLoginAuth,
      socialCredentials.type,
      socialCredentials.payload
    )
  }
  yield call(authFlow)
}

/**
 *  API login request/response handler
 *  @param   {String}     name of api service (same as action type)
 *  @param   {Object}     payload for api call, username and password
 *  @return  {Generator}
 */
function* loginAuth(type, payload) {
  try {
    const { access_token, refresh_token } = yield call(api[type], payload)
    yield put(login.success(access_token, refresh_token))
    yield call(authenticate)
    const url = new URL(window.location.href)
    const redirectPage = url.searchParams.get('redirect') || '/profile'
    yield put(push(redirectPage))
  } catch (err) {
    // const error = yield parseError(err)
    yield put(login.failure(err.message))
  }
}

function* socialLoginAuth(type, payload) {
  try {
    const { access_token, refresh_token } = yield call(api[type], payload)
    yield put(socialLogin.success(access_token, refresh_token))
    yield call(authenticate)
    const url = new URL(window.location.href)
    const redirectPage = url.searchParams.get('redirect') || '/profile'
    yield put(push(redirectPage))
  } catch (err) {
    // const error = yield parseError(err)
    yield put(socialLogin.failure(err))
  }
}

/**
 *  API authentication request/response handler. Used to validate the access token
 *  and/or get the user object. If an `invalid_token` error is returned, tries to
 *  refresh the access token before throwing.
 *  @return  {Generator}
 */
function* authenticate() {
  const onError = (error) =>
    error.statusCode >= 500
      ? put(tokenValidation.failure(error))
      : call(logoutSaga)

  yield makeAuthenticatedRequest({
    payload: {
      url: `${API_ROOT}/users/profile`,
      options: { config: { method: 'GET' } },
      onSuccess: function* acabar(response) {
        yield put(tokenValidation.success(response))
        yield put(changeLocale(response.locale))
      },
      onError,
    },
  })
}

/**
 *  Listen all FETCH action and start an authenticated request (i.e. with an access
 *  token and a refresh mecanism).
 *  @return  {Generator}
 */
export function* fetchListener(action) {
  const shouldRefresh = yield call(needRefresh)

  if (!shouldRefresh) yield call(makeAuthenticatedRequest, action)
  if (shouldRefresh) {
    const error = yield call(refreshTokens)
    if (!error) {
      // Because we are listening TOKEN_REFRESH.SUCCESS in a middleware, we need
      // to delay our reaction to the event to make sure it hit the store. Otherwise
      // we may end-up using the old tokens in our authenticated request.
      yield delay(50)
      yield call(makeAuthenticatedRequest, action)
    }
  }
}

/**
 *  Checks if the access token needs to be refreshed by comparing the expiration
 *  date with the current date.
 *  @return  {Bool}
 */
function* needRefresh() {
  const { accessTokenExpiresAt } = yield select(makeSelectTokens())
  const accessExpiration = new Date(accessTokenExpiresAt).getTime()

  return Date.now() >= accessExpiration
}

/**
 *  API Refresh token request/response handler. If the application has already ask
 *  for new tokens, wait for the completion of the first call and return (this prevents
 *  multiple refresh calls that may be fired by different authenticated requests).
 *  @return  {Generator}
 */
function* refreshTokens() {
  const isRefreshing = yield select(makeSelectRefreshing())

  // If the application is already waiting for a new set of tokens, wait for the
  // completion of that request instead of creating a new one.
  if (isRefreshing) {
    const { error } = yield race({
      success: take(TOKEN_REFRESH.SUCCESS),
      error: take(TOKEN_REFRESH.FAILURE),
    })
    return error
  }

  // Dispatch an action indicating that the application is waiting for new tokens.
  yield put(tokenRefresh.request())

  try {
    const { refreshToken } = yield select(makeSelectTokens())
    const tokens = yield call(refresh, refreshToken)
    yield put(tokenRefresh.success(tokens))
    return null
  } catch (err) {
    yield call(logoutSaga)
    return err
  }
}

function* logoutSaga() {
  yield call(logout)
  /* we go to frontend page */
  yield put(push('/signin'))
  yield call(authFlow)
}

/**
 *  Make a signed api call with refresh token process support. The action.payload
 *  must be structured like the example bellow.
 *  ex: {
 *    payload: {
 *      url: '/me',                         << can be absolute or relative url
 *      options: {                          << request fetch options
 *        method: 'GET',
 *      },
 *      onSuccess: tokenValidationSuccess,  << action to dispatch on resolve
 *      onError: tokenValidationError,      << action to dispatch on reject
 *    },
 *  }
 *  @param   {Object}     action
 *  @return  {Generator}
 */

function isTokenExpired(token) {
  const decodedToken = JSON.parse(atob(token.split('.')[1]))
  const expirationTime = decodedToken.exp * 1000 // convert to milliseconds
  const currentTime = Date.now()
  return expirationTime < currentTime
}

function* makeAuthenticatedRequest(action) {
  // Check for a specific outdated access token error. If the error matches, the
  // saga will try to refresh the access token then retry the initial request if
  // the refresh succeeds.

  const isAccessExpired = (error) =>
    error.error &&
    error.message &&
    error.statusCode &&
    error.statusCode === 401 &&
    error.error === 'Unauthorized' &&
    error.message === 'Invalid token: access token has expired'

  const tokens = yield select(makeSelectTokens())
  const { payload } = action

  // add Bearer token if available Bearer token if available
  const token = tokens.accessToken

  try {
    console.log(payload.url, payload.options, token)
    if (isTokenExpired(token)) throw err('token expired')
    const response = yield callApi(payload.url, payload.options, token)
    yield payload.onSuccess(response)
  } catch (err) {
    yield put(logout())
    const error = yield parseError(err)

    if (isAccessExpired(error)) {
      const refreshError = yield call(refreshTokens)
      if (!refreshError) {
        yield makeAuthenticatedRequest(action)
      }
    } else {
      // 50x errors are handled by the root container, as these are specific server
      // issues and are not page-specific.
      /*
      we'll see....
      yield error.statusCode >= 500
        ? put(setError(error))
        : payload.onError(error)
      */
    }
  }
}

/**
 *  If the errors is formatted by the server, tranforms it to a JS object. Otherwise,
 *  pass the raw error.
 *  @param   {Object}  error
 *  @return  {Generator}
 */
function* parseError(error) {
  let parsed

  try {
    parsed = yield error.response.json()
  } catch (err) {
    parsed = error.response
      ? { status: error.response.status, message: error.response.statusText }
      : { name: error.name, message: error.message }
  }

  return parsed
}

// All sagas to be loaded
// export default [fetchListener, authFlowSaga]

function* authFlowSaga() {
  // first time rehydrate before reading from state....
  yield take(REHYDRATE)
  // while (true) {
  const watcher = yield fork(authFlow)
  // yield take(LOCATION_CHANGE)
  // yield cancel(watcher)
  // watcher = yield fork(authFlow)
  // }
}

export default authFlowSaga
