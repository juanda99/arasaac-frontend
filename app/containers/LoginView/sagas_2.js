
import { fork, call, take, takeLatest, put, cancel } from 'redux-saga/effects'
import { LOGIN, LOGOUT, login, logout } from 'containers/LoginView/actions'
import api from 'services'

function* authorize(action) {
  try {
    const { username, password } = action.payload
    const { access_token, expires_in, token_type, refresh_token } = yield call(api.login, username, password)
    yield put(login.success())
    // en localstorage almacenaremos datos mediante un middleware:
    // yield call(API.storeItem, {TOKEN: token, USERNAME: username})
  } catch (error) {
    yield put(login.failure(error))
    // yield call(API.removeItem, TOKEN)
    // yield call(API.removeItem, USERNAME)
  }
}

function* loginFlow() {
  const watcher = yield takeLatest(LOGIN.REQUEST, authorize)
  // fork return a Task object
  // const task = yield fork(authorize, username, password)
  yield take('LOGOUT.REQUEST')
  yield cancel(watcher)
  yield put(logout.success())
}
/*
function* activationFlow() {
  while (true) {
    try {
      const { urlActivation } = yield take(ACTIVATION.REQUEST)
      yield call(API.userActivation, { urlActivation })
      yield put(activate.success())
    } catch (error) {
      yield put(activate.failure(error))
    }
  }
}
*/

export default [loginFlow]
