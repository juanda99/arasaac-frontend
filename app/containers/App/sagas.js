/*

export default function* root() {
  // do nothing
}

*/
import { delay } from 'redux-saga'
import { call, put, select, take, race } from 'redux-saga/effects'

import api from 'services'
import { setError } from 'containers/App/actions'

import { authorize, refresh } from './authentication'
import { makeSelectTokens, makeSelectHasUser, makeSelectRefreshing } from './selectors'
import { 
  TOKEN_VALIDATION,
  TOKEN_REFRESH,
  LOGIN,
  LOGOUT,
  tokenValidation,
  tokenRefresh,
  login,
  logout
} from './actions'

/**
 *  The saga flow for authentication. Starts with either a direct login (with
 *  login/password) or a validation from the token stored in the local storage.
 *  Once the authentication is valid, listens for calls to refresh the access token
 *  until the user logs out.
 *  @return  {Generator}
 */
function* authFlowSaga() {
  while (true) {
    const hasUser = yield select(makeSelectHasUser())

    while (!hasUser) {
      yield call(loggedOutFlowSaga)
    }

    if (hasUser) {
      yield take(LOGOUT, logout)
    }
  }
}

 /**
 *  Authentication starts either with classic login or with tokens fetched from
 *  localStorage
 *  @return  {Generator}
 */
function* loggedOutFlowSaga() {
  const { credentials, tokens } = yield race({
    credentials: take(LOGIN.REQUEST),
    tokens: take(TOKEN_VALIDATION.REQUEST)
  })
  if (credentials) yield call(loginAuth, credentials.payload.login, credentials.payload.password)
  if (tokens) yield call(authenticate)

  yield call(authFlowSaga)
}

/**
 *  API login request/response handler
 *  @param   {String}     username
 *  @param   {String}     password
 *  @return  {Generator}
 */
function* loginAuth(username, password) {
  try {
    const { access_token, refresh_token } = yield call(api.login, username, password)
    yield put(login.success(access_token, refresh_token))
    yield call(authenticate)
  } catch (err) {
    const error = yield parseError(err)
    yield put(login.failure(error))
  }
}


/**
 *  API authentication request/response handler. Used to validate the access token
 *  and/or get the user object. If an `invalid_token` error is returned, tries to
 *  refresh the access token before throwing.
 *  @return  {Generator}
 */
function* authenticate() {
  const onError = (error) => error.statusCode >= 500
    ? put(tokenValidationError(error))
    : call(logout)

  yield makeAuthenticatedRequest({
    payload: {
      url: '/me',
      options: { method: 'GET' },
      onSuccess: (response) => put(tokenValidationSuccess(response)),
      onError,
    },
  })
}

/**
 *  Listen all FETCH action and start an authenticated request (i.e. with an access
 *  token and a refresh mecanism).
 *  @return  {Generator}
 */
function* fetchListener(action) {
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
  const accessExpiration = (new Date(accessTokenExpiresAt)).getTime()

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
      success: TOKEN_REFRESH.SUCCESS,
      error: TOKEN_REFRESH.FAILURE
    })
    return error
  }

  // Dispatch an action indicating that the application is waiting for new tokens.
  yield put(tokenRefreshStart())

  try {
    const { refreshToken } = yield select(makeSelectTokens())
    const tokens = yield call(refresh, refreshToken)
    yield put(tokenRefreshSuccess(tokens))
    return null
  } catch (err) {
    yield call(logout)
    return err
  }
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
function* makeAuthenticatedRequest(action, accessToken) {
  // Check for a specific outdated access token error. If the error matches, the
  // saga will try to refresh the access token then retry the initial request if
  // the refresh succeeds.
  const isAccessExpired = (error) => error.error && error.message && error.statusCode
      && error.statusCode === 401
      && error.error === 'Unauthorized'
      && error.message === 'Invalid token: access token has expired'

  const tokens = yield select(makeSelectTokens())
  const { payload } = action

  // add Bearer token if available
  const token = accessToken || tokens.accessToken

  try {
    const response = yield call api[payload.item](payload.params, token)
    yield payload.onSuccess(response)
  } catch (err) {
    const error = yield parseError(err)

    if (isAccessExpired(error)) {
      const refreshError = yield call(refreshTokens)
      if (!refreshError) {
        yield makeAuthenticatedRequest(action)
      }
    } else {
      // 50x errors are handled by the root container, as these are specific server
      // issues and are not page-specific.
      yield error.statusCode >= 500
        ? put(setError(error))
        : payload.onError(error)
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
export default [fetchListener, authFlowSaga]
