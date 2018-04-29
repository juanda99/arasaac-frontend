import { take, takeLatest, call, put, cancel } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
// import { showLoading, hideLoading } from 'react-redux-loading-bar'
import api from 'services'
import { SIGNUP, signup } from './actions'

function* userSignup(action) {
  const { type, payload } = action
  try {
    yield call(api[type], payload)
    yield put(signup.success())
  } catch (err) {
    yield put(signup.failure(err))
  }
}

function* userSignupSaga() {
  const watcher = yield takeLatest(SIGNUP.REQUEST, userSignup)
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield cancel(watcher)
}

// All sagas to be loaded
export default [userSignupSaga]
